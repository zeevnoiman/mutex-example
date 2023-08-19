import Fastify from "fastify";
import { DbService } from "./services/db.service";
import { ItemsService } from "./services/items.service";


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

const mongoUri = "mongodb://root:example@localhost:27017/Items";
const db = new DbService(mongoUri);
const itemsService = new ItemsService(db);

const description = "My Item";
itemsService.createItem(description);
itemsService.updateItem(description, {
    address: "added 1",
    city: "New York",
    state: "NY",
    zip: "30001"
});

itemsService.updateItem(description, {
    address: "added 2",
    city: "New York",
    state: "NY",
    zip: "40001"
});