import { SimulateBattleUseCase } from './simulateBattle.uc'
import { Result, AppError } from '../../core'
import { SimulateBattleInput, SimulateBattleOutput } from './simulateBattle.dto'
import { Card, Attack } from '../../domain/entities'

describe('SimulateBattleUseCase', () => {
  let simulateBattleUseCase: SimulateBattleUseCase

  beforeEach(() => {
    simulateBattleUseCase = new SimulateBattleUseCase()
  })

  it('should return correct result when attacker wins', async () => {
    const attacker = new Card({
      id: 1,
      name: 'Charizard',
      type: 'Fire',
      hp: 100,
      rarity: 'Rare',
      expansion: 'Base Set',
      attacks: [new Attack({ name: 'Flamethrower', power: 90 })],
      weakness: 'Water',
      resistance: 'Grass',
      defense: 0
    })

    const defender = new Card({
      id: 2,
      name: 'Venusaur',
      type: 'Grass',
      hp: 100,
      rarity: 'Rare',
      expansion: 'Base Set',
      attacks: [new Attack({ name: 'Solar Beam', power: 80 })],
      weakness: 'Fire',
      resistance: 'Water',
      defense: 10
    })

    const input: SimulateBattleInput = { attacker, defender }
    const expectedOutput: SimulateBattleOutput = {
      attackerWins: true,
      attackerDamage: 180,
      defenderHP: -80
    }

    const result = await simulateBattleUseCase.exec(input)

    expect(result.isSuccessful).toBe(true)
    expect(result.value).toEqual(expectedOutput)
  })

  it('should return correct result when defender resists', async () => {
    const attacker = new Card({
      id: 1,
      name: 'Pikachu',
      type: 'Electric',
      hp: 60,
      rarity: 'Common',
      expansion: 'Base Set',
      attacks: [new Attack({ name: 'Thunderbolt', power: 50 })],
      weakness: 'Ground',
      resistance: 'Flying',
      defense: 0
    })

    const defender = new Card({
      id: 2,
      name: 'Golem',
      type: 'Ground',
      hp: 120,
      rarity: 'Rare',
      expansion: 'Base Set',
      attacks: [new Attack({ name: 'Rock Throw', power: 40 })],
      weakness: 'Water',
      resistance: 'Electric',
      defense: 10
    })

    const input: SimulateBattleInput = { attacker, defender }
    const expectedOutput: SimulateBattleOutput = {
      attackerWins: false,
      attackerDamage: 40,
      defenderHP: 80
    }

    const result = await simulateBattleUseCase.exec(input)

    expect(result.isSuccessful).toBe(true)
    expect(result.value).toEqual(expectedOutput)
  })

  it('should handle unexpected errors', async () => {
    const input: SimulateBattleInput = {
      attacker: {} as Card,
      defender: {} as Card
    }

    const result = await simulateBattleUseCase.exec(input)

    expect(result.isFailure).toBe(true)
    expect(result).toBeInstanceOf(AppError.UnexpectedError)
  })
})
