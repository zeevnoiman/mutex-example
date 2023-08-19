import Fastify from "fastify";

const fastify = Fastify({
    logger: true,
    requestTimeout: 30000, // 30 seconds
  });

const port: number = Number(process.env.PORT) || 3000;
 
fastify.listen({ port }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
 
  fastify.log.info(`Fastify is listening on port: ${address}`);
});