import { FastifyInstance, FastifyReply } from "fastify";
import { createCardSchema, CreateCardReq } from "./controllers/createCard";
import { createCardController } from "./controllers";

const cardsBasePath = "/cards";

export const router = async (app: FastifyInstance) => {
  app.route({
    url: cardsBasePath,
    method: "POST",
    schema: createCardSchema,
    handler: async (req: CreateCardReq, reply: FastifyReply) =>
      createCardController.exec(req, reply),
  });
};
