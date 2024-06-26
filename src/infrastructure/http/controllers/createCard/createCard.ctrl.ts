import { FastifyReply } from 'fastify'
import { BaseController, Result, UseCaseError } from '../../../../core'
import { CreateCardReq } from './createCard.types'
import { CreateCardInput, CreateCardOutput } from '../../../../application/createCard/createCard.dto'
import { CreateCardUseCase } from '../../../../application/createCard/createCard.uc'
import { CreateCardErrors } from '../../../../application/createCard/createCard.err'

export class CreateCardController extends BaseController {
  private readonly createCardUseCase: CreateCardUseCase

  constructor(createCardUseCase: CreateCardUseCase) {
    super()
    this.createCardUseCase = createCardUseCase
  }

  public async exec(req: CreateCardReq, reply: FastifyReply) {
    try {
      const useCaseInput: CreateCardInput = req.body

      const result = await this.createCardUseCase.exec(useCaseInput)

      if (result.isFailure) {
        const error = result as Result<UseCaseError>
        const errorMsg = error.errorValue.message
        console.error(`Error produced while creating card ${JSON.stringify(useCaseInput)}: ${errorMsg}`)
        switch (error.constructor) {
          case CreateCardErrors.CardCreationFailed:
            return this.conflict(reply, errorMsg)
          default:
            return this.internalServerError(reply, result.errorValue)
        }
      }

      const useCaseOutput = result.value as CreateCardOutput

      return await this.ok<CreateCardOutput>(reply, useCaseOutput)
    } catch (error: any) {
      console.error(`Unexpected error produces at ${this.constructor.name}: ${error}`)
      return this.internalServerError(reply, error)
    }
  }
}
