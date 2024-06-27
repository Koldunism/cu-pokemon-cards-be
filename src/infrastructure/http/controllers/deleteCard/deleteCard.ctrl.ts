import { FastifyReply } from 'fastify'
import { BaseController, Result, UseCaseError } from '../../../../core'
import {
  DeleteCardError,
  DeleteCardInput,
  DeleteCardOutput,
  DeleteCardUseCase
} from '../../../../application/deleteCard'
import { DeleteCardReq } from './deleteCard.types'

export class DeleteCardController extends BaseController {
  private readonly deleteCardUseCase: DeleteCardUseCase

  constructor(deleteCardUseCase: DeleteCardUseCase) {
    super()
    this.deleteCardUseCase = deleteCardUseCase
  }

  public async exec(req: DeleteCardReq, reply: FastifyReply) {
    try {
      const { id }: DeleteCardInput = req.params

      const result = await this.deleteCardUseCase.exec({ id })

      if (result.isFailure) {
        const error = result as Result<UseCaseError>
        const errorMsg = error.errorValue.message
        console.error(`Error deleting card with id ${id}: ${errorMsg}`)
        switch (error.constructor) {
          case DeleteCardError.CardDeletionFailed:
            return this.noContent(reply)
          default:
            return this.internalServerError(reply, result.errorValue)
        }
      }

      const useCaseOutput = result.value as DeleteCardOutput

      return await this.ok(reply, useCaseOutput)
    } catch (error: any) {
      console.error(`Unexpected error produced at ${this.constructor.name}: ${error}`)
      return this.internalServerError(reply, error)
    }
  }
}
