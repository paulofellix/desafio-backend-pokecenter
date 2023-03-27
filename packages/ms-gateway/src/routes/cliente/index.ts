import { CreateUserRequest, GetUserRequest } from '@pokecenter/proto';
import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify';
import { GprcError } from '../../helpers/gprcError';

const getUserAsync = async (fastify: FastifyInstance, id: number) => {
  return new Promise((resolve, reject) => {
    const msRequest = new GetUserRequest();
    msRequest.setId(id);
    fastify.ms.users.getUser(msRequest, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.toObject());
      }
    });
  });
};

const createUserMS = async (fastify: FastifyInstance, data: any) => {
  return new Promise((resolve, reject) => {
    const msRequest = new CreateUserRequest();
    msRequest.setId(data.id);
    msRequest.setName(data.nome);
    msRequest.setPhone(data.telefone);
    fastify.ms.users.createUser(msRequest, (err, response) => {
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
  fastify.get('/:id', async (request: FastifyRequest<any>, reply) => {
    try {
      const { id } = request.params as any;
      const user = await getUserAsync(fastify, id);
      reply.send(user);
    } catch (err) {
      fastify.log.error(err);
      reply.status(500).send({ message: 'Internal Server Error', err });
    }
  });

  fastify.post('/', async (request: FastifyRequest<any>, reply) => {
    try {
      const { id, nome, telefone } = request.body as any;
      await createUserMS(fastify, { id, nome, telefone });
      reply.status(201).send({ message: 'OK' });
    } catch (err) {
      fastify.log.error(err);
      if (err instanceof GprcError) {
        reply.status(400).send({ errors: err.details });
        return;
      } else {
        reply.status(500).send({ message: 'Internal Server Error', err });
      }
    }
  });
};

export default routes;
