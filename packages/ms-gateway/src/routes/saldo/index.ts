import { BalanceRequest } from '@pokecenter/proto';
import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify';

const getBalanceMS = async (fastify: FastifyInstance, id: number) => {
  return new Promise((resolve, reject) => {
    const msRequest = new BalanceRequest();
    msRequest.setClientId(id);
    fastify.ms.financial.balance(msRequest, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.toObject());
      }
    });
  });
};

const routes: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get('/', async (request: FastifyRequest<any>, reply) => {
    try {
      const { id_do_cliente: clientId } = request.query as any;
      const userBalance = await getBalanceMS(fastify, clientId);
      reply.send(userBalance);
    } catch (err) {
      fastify.log.error(err);
      throw err;
    }
  });
};

export default routes;
