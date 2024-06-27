import { FastifyReply } from 'fastify'
import { BaseController, Result, UseCaseError } from '../../../../core'
import { GetDamageModifiersUseCase } from '../../../../application/getDamageModifiers'
import { GetDamageModifiersOutput, GetDamageModifiersInput } from '../../../../application/getDamageModifiers'
import { GetDamageModifiersReq } from './getDamageModifiers.types'
import { GetDamageModifiersError } from '../../../../application/getDamageModifiers'

export class GetDamageModifiersController extends BaseController {
  private readonly getDamageModifiersUseCase: GetDamageModifiersUseCase

  constructor(getDamageModifiersUseCase: GetDamageModifiersUseCase) {
    super()
    this.getDamageModifiersUseCase = getDamageModifiersUseCase
  }

  public async exec(req: GetDamageModifiersReq, reply: FastifyReply) {
    try {
      const { id }: GetDamageModifiersInput = req.params

      const result = await this.getDamageModifiersUseCase.exec({ id })

      if (result.isFailure) {
        const error = result as Result<UseCaseError>
        const errorMsg = error.errorValue.message
        console.error(`Error identifying damage modifiers for card with id ${id}: ${errorMsg}`)
        switch (error.constructor) {
          case GetDamageModifiersError.CardNotFound:
            return this.notFound(reply, errorMsg)
          default:
            return this.internalServerError(reply, result.errorValue)
        }
      }

      const useCaseOutput = result.value as GetDamageModifiersOutput

      return await this.ok<GetDamageModifiersOutput>(reply, useCaseOutput)
    } catch (error: any) {
      console.error(`Unexpected error produced at ${this.constructor.name}: ${error}`)
      return this.internalServerError(reply, error)
    }
  }
}
