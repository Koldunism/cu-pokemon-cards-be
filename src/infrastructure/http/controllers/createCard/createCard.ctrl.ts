import { FastifyReply } from "fastify";
import { BaseController } from "../../../../core";
import { CreateCardReq } from "./createCard.types";
import { Card } from "../../../../domain/entities";

export class CreateCardController extends BaseController {
  private readonly createCardUseCase: any; // TODO: assign to CreateCardUseCase

  constructor(createCardUseCase: any) {
    super();
    this.createCardUseCase = createCardUseCase;
  }

  public async exec(req: CreateCardReq, reply: FastifyReply) {
    const cardRequested = req.body as Card;

    this.ok<Card>(reply, cardRequested);
  }
}
