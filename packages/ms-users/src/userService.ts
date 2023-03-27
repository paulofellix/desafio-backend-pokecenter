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
  FinancialClient,
  IUsersServer,
} from '@pokecenter/proto';
import {
  GetUserRequest,
  GetUserResponse,
  CreateUserRequest,
} from '@pokecenter/proto';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import database, { DatabaseError } from './dbConnector';
import z from 'zod';

const createBalance = async (clientId: number): Promise<BalanceResponse> => {
  return new Promise((resolve, reject) => {
    const usersClient = new FinancialClient(
      'localhost:50052',
      credentials.createInsecure()
    );
    const balance = new BalanceRequest();
    balance.setClientId(clientId);
    usersClient.balance(balance, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

export const UserServer: IUsersServer = {
  getUser: async function (
    call: ServerUnaryCall<GetUserRequest, GetUserResponse>,
    callback: sendUnaryData<GetUserResponse>
  ): Promise<void> {
    const id = call.request.getId();
    if (!id) {
      const err: ServerErrorResponse = {
        name: 'InvalidArgument',
        code: grpcStatus.INVALID_ARGUMENT,
        message: 'id is required',
        details: 'id is required',
      };
      callback(err, null);
    } else {
      const res: GetUserResponse.AsObject = await database('client')
        .where({ id })
        .first();
      if (!res) {
        const err: ServerErrorResponse = {
          name: 'UserNotFound',
          code: grpcStatus.NOT_FOUND,
          message: 'user not found',
          details: 'user not found',
        };
        callback(err, null);
      } else {
        const reply = new GetUserResponse();
        reply.setId(res.id);
        reply.setName(res.name);
        reply.setPhone(
          res.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
        );
        reply.setBalance(res.balance);
        callback(null, reply);
      }
    }
  },
  createUser: async function (
    call: ServerUnaryCall<CreateUserRequest, Empty>,
    callback: sendUnaryData<Empty>
  ): Promise<void> {
    const schema = z.object({
      id: z.number(),
      name: z.string(),
      phone: z
        .string()
        .nonempty()
        .min(11)
        .transform(phone => phone.replace(/\D/g, '')),
    });

    const user: z.infer<typeof schema> = {
      id: call.request.getId(),
      name: call.request.getName(),
      phone: call.request.getPhone(),
    };

    try {
      const validatedUser = schema.parse(user);
      if (await database('client').where({ id: validatedUser.id }).first()) {
        const metadata = new Metadata();
        metadata.set('error', 'user_already_exists');
        const res: ServerErrorResponse = {
          code: grpcStatus.ALREADY_EXISTS,
          name: 'AlreadyExists',
          message: 'user already exists',
          details: 'user already exists',
          metadata,
        };
        callback(res, null);
      } else {
        await database('client').insert(validatedUser);
        await createBalance(validatedUser.id);
        callback(null, new Empty());
      }
    } catch (err) {
      // @ts-ignore
      console.log(err.constructor.name);
      if (err instanceof z.ZodError) {
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
        const errMetadata = new Metadata();
        errMetadata.set('error', err.message);
        const res: ServerErrorResponse = {
          name: 'Unknown',
          code: grpcStatus.INTERNAL,
          message: err.message,
          details: err.message,
          metadata: errMetadata,
        };
        callback(res, null);
      }
    }
  },
};
