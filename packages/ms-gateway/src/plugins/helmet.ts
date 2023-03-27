import fp from 'fastify-plugin';
import helmet from '@fastify/helmet';

export default fp(async (fastify, opts) => {
  void fastify.register(helmet);
});
