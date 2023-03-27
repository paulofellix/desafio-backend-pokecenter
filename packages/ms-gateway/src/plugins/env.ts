import fp from 'fastify-plugin';
import z from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.string().optional(),
});

export type EnvSchema = z.infer<typeof envSchema>;

export default fp(async fastify => {
  try {
    const env = envSchema.parse(process.env);
    fastify.decorate('env', env);
    fastify.log.info('Loaded environment variables');
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error(err.issues);
    }
    throw Error('Não foi possível carregar as váriaveis de ambiente');
  }
});
