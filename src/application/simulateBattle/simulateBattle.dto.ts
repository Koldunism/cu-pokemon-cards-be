import { Card } from '../../domain/entities'

export type SimulateBattleInput = {
  attacker: Card
  defender: Card
}

export type SimulateBattleOutput = {
  attackerWins: boolean
  attackerDamage: number
  defenderHP: number
}
