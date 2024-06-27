import { FastifyReply } from 'fastify'
import { BaseController, Result, UseCaseError } from '../../../../core'
import { GetAllCardsInput, GetAllCardsOutput } from '../../../../application/getAllCards/getAllCards.dto'
import { GetAllCardsUseCase } from '../../../../application/getAllCards/getAllCards.uc'
import { GetAllCardsReq } from '.'
import { CardFilters } from '../../../../domain/repositories/card.repo'

export class GetAllCardsController extends BaseController {
  private readonly getAllCardsUseCase: GetAllCardsUseCase

  constructor(getAllCardsUseCase: GetAllCardsUseCase) {
    super()
    this.getAllCardsUseCase = getAllCardsUseCase
  }

  public async exec(req: GetAllCardsReq, reply: FastifyReply) {
    try {
      const useCaseInput: GetAllCardsInput & CardFilters = req.query

      const result = await this.getAllCardsUseCase.exec(useCaseInput)

      if (result.isFailure) {
        const error = result as Result<UseCaseError>
        const errorMsg = error.errorValue.message
        console.error(`Error fetching cards: ${errorMsg}`)
        return this.internalServerError(reply, result.errorValue)
      }

      const useCaseOutput = result.value as GetAllCardsOutput

      return await this.ok<GetAllCardsOutput>(reply, useCaseOutput)
    } catch (error: any) {
      console.error(`Unexpected error produced at ${this.constructor.name}: ${error}`)
      return this.internalServerError(reply, error)
    }
  }
}
