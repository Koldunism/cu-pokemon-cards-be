import { FastifyReply } from "fastify";
import { STATUS_CODES } from "http";

interface HttpErrorRes {
  [key: string]: any;
}

export class HttpResponse {
  private async jsonResponse(
    reply: FastifyReply,
    code: number,
    message?: unknown
  ): Promise<any> {
    return reply.type("application/json").code(code).send(message);
  }

  public async ok<T>(res: FastifyReply, dto?: T): Promise<any> {
    return this.jsonResponse(res, 200, dto || STATUS_CODES[200]);
  }

  public async created(res: FastifyReply): Promise<any> {
    return this.jsonResponse(res, 201, STATUS_CODES[201]);
  }

  public async badRequest(
    res: FastifyReply,
    message?: string | HttpErrorRes
  ): Promise<any> {
    return this.jsonResponse(res, 400, { code: STATUS_CODES[400], message });
  }
  public async unauthorized(
    res: FastifyReply,
    message?: string | HttpErrorRes
  ): Promise<any> {
    return this.jsonResponse(res, 401, { code: STATUS_CODES[401], message });
  }
  public async forbidden(
    res: FastifyReply,
    message?: string | HttpErrorRes
  ): Promise<any> {
    return this.jsonResponse(res, 403, { code: STATUS_CODES[403], message });
  }
  public async notFound(
    res: FastifyReply,
    message?: string | HttpErrorRes
  ): Promise<any> {
    return this.jsonResponse(res, 404, { code: STATUS_CODES[404], message });
  }
  public async conflict(
    res: FastifyReply,
    message?: string | HttpErrorRes
  ): Promise<any> {
    return this.jsonResponse(res, 409, { code: STATUS_CODES[409], message });
  }
  public async internalServerError(
    res: FastifyReply,
    message?: string | HttpErrorRes
  ): Promise<any> {
    return this.jsonResponse(res, 500, { code: STATUS_CODES[500], message });
  }
}
