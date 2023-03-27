import type { FastifyPluginAsync } from 'fastify';

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/', async () => ({ status: true }));
  fastify.get('/health/check', async () => ({ status: true }));
};

export default root;
