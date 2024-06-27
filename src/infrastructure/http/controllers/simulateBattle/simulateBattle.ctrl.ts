import { FastifyReply } from 'fastify'
import { BaseController, Result, UseCaseError } from '../../../../core'
import { GetCardByIdUseCase } from '../../../../application/getCardById/getCardById.uc'
import { SimulateBattleUseCase } from '../../../../application/simulateBattle/simulateBattle.uc'
import { SimulateBattleInput, SimulateBattleOutput } from '../../../../application/simulateBattle/simulateBattle.dto'
import { SimulateBattleReq } from './simulateBattle.types'
import { Card } from '../../../../domain/entities'

export class SimulateBattleController extends BaseController {
  private readonly getCardByIdUseCase: GetCardByIdUseCase
  private readonly simulateBattleUseCase: SimulateBattleUseCase

  constructor(getCardByIdUseCase: GetCardByIdUseCase, simulateBattleUseCase: SimulateBattleUseCase) {
    super()
    this.getCardByIdUseCase = getCardByIdUseCase
    this.simulateBattleUseCase = simulateBattleUseCase
  }

  public async exec(req: SimulateBattleReq, reply: FastifyReply) {
    try {
      const { attackerId, defenderId } = req.query as { attackerId: number; defenderId: number }

      const attackerResult = await this.getCardByIdUseCase.exec({ id: attackerId })
      if (attackerResult.isFailure) {
        const error = attackerResult as Result<UseCaseError>
        return this.notFound(reply, error.errorValue.message)
      }

      const defenderResult = await this.getCardByIdUseCase.exec({ id: defenderId })
      if (defenderResult.isFailure) {
        const error = defenderResult as Result<UseCaseError>
        return this.notFound(reply, error.errorValue.message)
      }

      const attacker = attackerResult.value.data
      const defender = defenderResult.value.data

      const input: SimulateBattleInput = {
        attacker,
        defender
      }

      const result = await this.simulateBattleUseCase.exec(input)

      if (result.isFailure) {
        const error = result as Result<UseCaseError>
        const errorMsg = error.errorValue.message
        console.error(`Error simulating battle: ${errorMsg}`)
        return this.internalServerError(reply, result.errorValue)
      }

      const useCaseOutput = result.value as SimulateBattleOutput

      return await this.ok<SimulateBattleOutput>(reply, useCaseOutput)
    } catch (error: any) {
      console.error(`Unexpected error produced at ${this.constructor.name}: ${error}`)
      return this.internalServerError(reply, error)
    }
  }
}
