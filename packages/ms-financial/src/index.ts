import 'dotenv/config';
import { Server, ServerCredentials } from '@grpc/grpc-js';
import Proto from '@pokecenter/proto';
import { FinacialServer } from './financialService';

const server = new Server();
const port = process.env.PORT;
const uri = `0.0.0.0:${port}`;

console.log(`Service MS:Finacial running on port ${port}`);

server.addService(Proto.FinancialService, FinacialServer);
server.bindAsync(uri, ServerCredentials.createInsecure(), err => {
  if (err) console.error(err);
  server.start();
});
