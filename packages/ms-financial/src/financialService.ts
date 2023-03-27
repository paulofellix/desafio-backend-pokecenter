import {
  ServerUnaryCall,
  sendUnaryData,
  ServerErrorResponse,
  status as grpcStatus,
  Metadata,
  credentials,
} from '@grpc/grpc-js';
import {
  BalanceRequest,
  BalanceResponse,
  GetUserRequest,
  GetUserResponse,
  IFinancialServer,
  TransactionRequest,
  TransactionType,
  UsersClient,
} from '@pokecenter/proto';
import database from './dbConnector';
import z, { ZodError } from 'zod';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

const getClient = async (clientId: number): Promise<GetUserResponse> => {
  return new Promise((resolve, reject) => {
    const usersClient = new UsersClient(
      'localhost:50051',
      credentials.createInsecure()
    );
    const getUser = new GetUserRequest();
    getUser.setId(clientId);
    usersClient.getUser(getUser, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

export const FinacialServer: IFinancialServer = {
  balance: async function (
    call: ServerUnaryCall<BalanceRequest, BalanceResponse>,
    callback: sendUnaryData<BalanceResponse>
  ): Promise<void> {
    const clientId = call.request.getClientId();
    if (!clientId) {
      const err: ServerErrorResponse = {
        name: 'InvalidArgument',
        code: grpcStatus.INVALID_ARGUMENT,
        message: 'Invalid Argument',
        details: 'Invalid Argument',
      };
      callback(err, null);
    } else {
      const res = await database('balance')
        .where({ client_id: clientId })
        .first();
      if (!res) {
        try {
          await getClient(clientId);
          await database('balance').insert({
            client_id: clientId,
            amount: 0,
          });
          const reply = new BalanceResponse();
          reply.setBalance(0);
          callback(null, reply);
        } catch (err) {
          console.error(err);
          const errResponse: ServerErrorResponse = {
            name: 'UserNotFound',
            code: grpcStatus.NOT_FOUND,
            message: 'user not found',
            details: 'user not found',
          };
          callback(errResponse, null);
        }
      } else {
        const reply = new BalanceResponse();
        reply.setBalance(res.amount);
        callback(null, reply);
      }
    }
  },
  transaction: async function (
    call: ServerUnaryCall<TransactionRequest, Empty>,
    callback: sendUnaryData<Empty>
  ): Promise<void> {
    const schema = z.object({
      client_id: z.number(),
      amount: z.number().transform(val => Math.abs(val)),
      type: z
        .number()
        .transform(val => {
          if (val === TransactionType.DEBIT) {
            return 'DEBIT';
          } else if (val === TransactionType.CREDIT) {
            return 'CREDIT';
          } else {
            return 'INVALID';
          }
        })
        .refine(val => ['CREDIT', 'DEBIT'].includes(val), {
          message: 'invalid transaction type',
        }),
    });

    const reqTransaction = {
      client_id: call.request.getClientId(),
      amount: call.request.getAmount(),
      type: call.request.getType(),
    };

    try {
      const validatedTransaction = schema.parse(reqTransaction);
      validatedTransaction.amount =
        validatedTransaction.type === 'CREDIT'
          ? validatedTransaction.amount
          : -validatedTransaction.amount;

      const currentBalance = await database('balance')
        .where({
          client_id: validatedTransaction.client_id,
        })
        .first();

      const newBalance =
        Number(currentBalance.amount) + Number(validatedTransaction.amount);

      if (newBalance < 0) {
        console.error('insufficient funds');
        const errMetadata = new Metadata();
        errMetadata.set('error', 'insufficient_funds');
        errMetadata.set('error_message', 'insufficient funds');

        const res: ServerErrorResponse = {
          name: 'InsufficientFunds',
          code: grpcStatus.INVALID_ARGUMENT,
          message: 'insufficient funds',
          details: 'insufficient funds',
          metadata: errMetadata,
        };
        callback(res, null);
        return;
      }

      await getClient(validatedTransaction.client_id);
      const dbTransaction = await database.transaction();
      await dbTransaction('transaction').insert({
        client_id: validatedTransaction.client_id,
        amount: validatedTransaction.amount,
        type: validatedTransaction.type,
      });
      await dbTransaction('balance')
        .where({ client_id: validatedTransaction.client_id })
        .increment('amount', validatedTransaction.amount);
      await dbTransaction.commit();
      callback(null, new Empty());
    } catch (err) {
      if (err instanceof ZodError) {
        const errMetadata = new Metadata();
        errMetadata.set('error', JSON.stringify(err.formErrors.fieldErrors));
        const res: ServerErrorResponse = {
          name: 'InvalidArgument',
          code: grpcStatus.INVALID_ARGUMENT,
          message: 'invalid arguments',
          details: 'invalid arguments',
          metadata: errMetadata,
        };
        callback(res, null);
      } else if (err instanceof Error) {
        const grpcError: ServerErrorResponse = err;
        callback(grpcError, null);
      } else {
        callback(null, null);
      }
    }
  },
};
