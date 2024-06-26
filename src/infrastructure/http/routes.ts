import { FastifyInstance, FastifyReply } from "fastify";

export const router = async (app: FastifyInstance) => {
  app.route({
    url: "/cards",
    method: "GET",
    schema: {}, // TODO: implement Schema
    handler: async (
      req: any /*TODO: implement custom req*/,
      res: FastifyReply
    ) => console.log("get cards controller"), // TODO create controller
  });
};
