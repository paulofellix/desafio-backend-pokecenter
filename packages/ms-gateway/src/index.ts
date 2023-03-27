import Fastify from 'fastify';
import Autoload from '@fastify/autoload';

import 'dotenv/config';

const fastify = Fastify({logger: true});

void fastify.register(Autoload, {
  dir: `${__dirname}/plugins`,
  maxDepth: 3,
});

void fastify.register(Autoload, {
  dir: `${__dirname}/routes`,
  maxDepth: 3,
});

void fastify.listen(
  {host: '0.0.0.0', port: Number(process.env.PORT)},
  (err, address) => {
    if (err) throw err;
    fastify.log.info(`server listening on ${address}`);
  }
);
