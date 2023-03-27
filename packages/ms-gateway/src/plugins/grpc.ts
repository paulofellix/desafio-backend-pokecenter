import {UsersClient, FinancialClient} from '@pokecenter/proto';
import {credentials} from '@grpc/grpc-js';
import fp from 'fastify-plugin';

const usersClient = new UsersClient(
  'localhost:50051',
  credentials.createInsecure()
);

const financialClient = new FinancialClient(
  'localhost:50052',
  credentials.createInsecure()
);

export default fp(async fastify => {
  fastify.decorate('ms', {
    users: usersClient,
    financial: financialClient,
  });
});
