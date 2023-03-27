import { TransactionRequest, TransactionType } from '@pokecenter/proto';
import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify';
import z from 'zod';
import { GprcError } from '../../helpers/gprcError';

const createTransactionMS = async (
  fastify: FastifyInstance,
  data: TransactionRequest.AsObject
) => {
  return new Promise((resolve, reject) => {
    const msRequest = new TransactionRequest();
    msRequest.setClientId(data.clientId);
    msRequest.setAmount(data.amount);
    msRequest.setType(data.type);
    fastify.ms.financial.transaction(msRequest, (err, response) => {
      if (err) {
        const grpcError = new GprcError(
          err.code,
          err.message,
          err.details,
          err.metadata
        );
        reject(grpcError);
      } else {
        resolve(response.toObject());
      }
    });
  });
};

const routes: FastifyPluginAsync = async (fastify, opts) => {
  fastify.post('/', async (request: FastifyRequest<any>, reply) => {
    try {
      const schema = z.object({
        id_do_cliente: z.number(),
        valor: z.number(),
        tipo: z
          .enum(['credito', 'debito'])
          .transform(v => v.toUpperCase())
          .transform(v =>
            v === 'CREDITO' ? TransactionType.CREDIT : TransactionType.DEBIT
          ),
      });

      const valid = schema.parse(request.body);
      const userBalance = await createTransactionMS(fastify, {
        clientId: valid.id_do_cliente,
        amount: valid.valor,
        type: valid.tipo,
      });
      reply.status(201).send({ message: 'OK' });
    } catch (err) {
      fastify.log.error(err);
      if (err instanceof z.ZodError) {
        reply.status(400).send({ errors: err.flatten().fieldErrors });
        return;
      } else if (err instanceof GprcError) {
        if (err.metadata.get('error')[0] === 'insufficient_funds') {
          reply.status(400).send({ errors: err.details });
          return;
        }
      }
    }
  });
};

export default routes;
