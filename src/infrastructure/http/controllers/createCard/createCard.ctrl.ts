import { FastifyReply } from "fastify";
import { BaseController } from "../../../../core";
import { CreateCardReq } from "./createCard.types";
import {
  CreateCardInput,
  CreateCardOutput,
} from "../../../../application/createCard/createCard.dto";
import { CreateCardUseCase } from "../../../../application/createCard/createCard.uc";

export class CreateCardController extends BaseController {
  private readonly createCardUseCase: CreateCardUseCase;

  constructor(createCardUseCase: CreateCardUseCase) {
    super();
    this.createCardUseCase = createCardUseCase;
  }

  public async exec(req: CreateCardReq, reply: FastifyReply) {
    try {
      const useCaseInput: CreateCardInput = req.body;

      const result = await this.createCardUseCase.exec(useCaseInput);

      if (result.isFailure) {
        return this.internalServerError(reply, result.errorValue);
      }

      const useCaseOutput = result.value as CreateCardOutput;

      return await this.ok<CreateCardOutput>(reply, useCaseOutput);
    } catch (error: any) {
      return this.internalServerError(reply, error);
    }
  }
}
