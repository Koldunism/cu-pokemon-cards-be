import { FastifyReply, FastifyRequest } from "fastify";
import { HttpResponse } from "../infrastructure/http/httpResponses/HttpResponse";

export abstract class BaseController extends HttpResponse {
  public abstract exec(req: FastifyRequest, reply: FastifyReply): Promise<any>;
}
