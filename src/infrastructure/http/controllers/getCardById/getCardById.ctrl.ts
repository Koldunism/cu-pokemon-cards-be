import { FastifyReply } from 'fastify'
import { BaseController, Result, UseCaseError } from '../../../../core'
import { GetCardByIdError, GetCardByIdUseCase } from '../../../../application/getCardById'
import { GetCardByIdOutput, GetCardByIdInput } from '../../../../application/getCardById'
import { GetCardByIdReq } from './getCardById.types'

export class GetCardByIdController extends BaseController {
  private readonly getCardByIdUseCase: GetCardByIdUseCase

  constructor(getCardByIdUseCase: GetCardByIdUseCase) {
    super()
    this.getCardByIdUseCase = getCardByIdUseCase
  }

  public async exec(req: GetCardByIdReq, reply: FastifyReply) {
    try {
      const { id }: GetCardByIdInput = req.params

      const result = await this.getCardByIdUseCase.exec({ id })

      if (result.isFailure) {
        const error = result as Result<UseCaseError>
        const errorMsg = error.errorValue.message
        console.error(`Error fetching card with id ${id}: ${errorMsg}`)
        switch (error.constructor) {
          case GetCardByIdError.CardNotFound:
            return this.notFound(reply, errorMsg)
          default:
            return this.internalServerError(reply, result.errorValue)
        }
      }

      const useCaseOutput = result.value as GetCardByIdOutput

      return await this.ok<GetCardByIdOutput>(reply, useCaseOutput)
    } catch (error: any) {
      console.error(`Unexpected error produced at ${this.constructor.name}: ${error}`)
      return this.internalServerError(reply, error)
    }
  }
}
