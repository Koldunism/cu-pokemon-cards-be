import { FastifyReply } from 'fastify'
import { BaseController, Result, UseCaseError } from '../../../../core'
import { UpdateCardInput, UpdateCardOutput } from '../../../../application/updateCard'
import { UpdateCardUseCase } from '../../../../application/updateCard/updateCard.uc'
import { Card } from '../../../../domain/entities'
import { UpdateCardReq } from './updateCard.types'

export class UpdateCardController extends BaseController {
  private readonly updateCardUseCase: UpdateCardUseCase

  constructor(updateCardUseCase: UpdateCardUseCase) {
    super()
    this.updateCardUseCase = updateCardUseCase
  }

  public async exec(req: UpdateCardReq, reply: FastifyReply) {
    try {
      const { id } = req.params as { id: number }
      const body = req.body as Partial<Card>

      const useCaseInput: UpdateCardInput = { id, ...body }

      const result = await this.updateCardUseCase.exec(useCaseInput)

      if (result.isFailure) {
        const error = result as Result<UseCaseError>
        const errorMsg = error.errorValue.message
        console.error(`Error updating card: ${errorMsg}`)
        return this.internalServerError(reply, result.errorValue)
      }

      const useCaseOutput = result.value as UpdateCardOutput

      return await this.ok<UpdateCardOutput>(reply, useCaseOutput)
    } catch (error: any) {
      console.error(`Unexpected error produced at ${this.constructor.name}: ${error}`)
      return this.internalServerError(reply, error)
    }
  }
}
