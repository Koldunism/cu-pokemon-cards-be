import { AppError, BaseUseCase, Result } from '../../core'
import { SimulateBattleInput, SimulateBattleOutput } from './simulateBattle.dto'

type UseCaseResult = AppError.UnexpectedError | Result<SimulateBattleOutput>

export class SimulateBattleUseCase extends BaseUseCase<SimulateBattleInput, UseCaseResult> {
  public async exec(input: SimulateBattleInput) {
    try {
      const { attacker, defender } = input

      const attackPower = attacker.attacks.reduce((max, attack) => Math.max(max, attack.power), 0)

      let damage = attackPower

      if (defender.weakness === attacker.type) {
        damage = attackPower * 2
      } else if (defender.resistance === attacker.type) {
        damage = attackPower - defender.defense!
      }

      const defenderHpAfterAttack = defender.hp - damage
      const attackerWins = defenderHpAfterAttack <= 0

      const output: SimulateBattleOutput = {
        attackerWins,
        attackerDamage: damage,
        defenderHP: defenderHpAfterAttack
      }

      return Result.success<SimulateBattleOutput>(output)
    } catch (error: any) {
      console.error('Error at SimulateBattleUseCase:', error)
      return AppError.UnexpectedError.create(error)
    }
  }
}
