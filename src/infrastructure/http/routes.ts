import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createCardSchema } from "./controllers/crearteCard/createCard.schema";

const cardsBasePath = "/cards";

export const router = async (app: FastifyInstance) => {
  app.route({
    url: cardsBasePath,
    method: "POST",
    schema: createCardSchema, // TODO: implement Schema
    handler: async (
      req: FastifyRequest /*TODO: implement custom req*/,
      res: FastifyReply
    ) => console.log(req.body), // TODO create controller
  });
};
