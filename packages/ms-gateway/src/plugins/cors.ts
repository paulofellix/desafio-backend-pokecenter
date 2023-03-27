import fp from 'fastify-plugin';
import cors from '@fastify/cors';
import type { FastifyCorsOptions } from '@fastify/cors';

export default fp<FastifyCorsOptions>(async fastify => {
  void fastify.register(cors, {
    origin: '*',
  });
});
