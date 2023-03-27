import {Knex} from 'knex';
import {EnvSchema} from '../../plugins/env';
import {FinancialClient, UsersClient} from '@pokecenter/proto';

declare module 'fastify' {
  interface FastifyInstance {
    env: EnvSchema;
    ms: {
      users: UsersClient;
      financial: FinancialClient;
    };
  }
}
