import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerui from '@fastify/swagger-ui';

const swaggerPlugin = fp(async (fastify, opts) => {
  fastify.register(swagger, {
    mode: 'static',
    specification: {
      baseDir: __dirname,
      path: './swagger.json',
    },
  });
  fastify.register(swaggerui, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: header => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });
});

export default swaggerPlugin;
