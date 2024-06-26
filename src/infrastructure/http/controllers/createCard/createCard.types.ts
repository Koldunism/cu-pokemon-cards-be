import { FastifyRequest } from "fastify";
import { Card } from "../../../../domain/entities";

export type CreateCardReq = FastifyRequest<{
  Body: Card;
}>;
