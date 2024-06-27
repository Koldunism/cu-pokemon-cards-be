import { GetDamageModifiersUseCase } from './getDamageModifiers.uc'
import { CardRepository } from '../../domain/repositories/card.repo'
import { AppError } from '../../core'
import { GetDamageModifiersInput } from './getDamageModifiers.dto'
import { GetDamageModifiersError } from './getDamageModifiers.err'

jest.mock('../../domain/repositories/card.repo')

describe('GetDamageModifiersUseCase', () => {
  let useCase: GetDamageModifiersUseCase
  let mockCardRepository: jest.Mocked<CardRepository>

  beforeEach(() => {
    mockCardRepository = {
      getCardById: jest.fn(),
      getCardsByType: jest.fn()
    } as unknown as jest.Mocked<CardRepository>

    useCase = new GetDamageModifiersUseCase(mockCardRepository)
  })

  it('should return weakAgainst and resistantAgainst if card found', async () => {
    const input: GetDamageModifiersInput = { id: 1 }
    const card = {
      id: 1,
      name: 'Pikachu',
      type: 'Electric',
      hp: 35,
      rarity: 'Common',
      attacks: [],
      expansion: 'Base Set',
      weakness: 'Ground',
      resistance: 'Flying'
    }
    const weaknessCards = [
      {
        id: 2,
        name: 'Onix',
        type: 'Ground',
        hp: 100,
        weakness: 'Grass',
        expansion: 'Gen 1',
        attacks: [],
        rarity: 'common'
      }
    ]
    const resistanceCards = [
      {
        id: 3,
        name: 'Pidgey',
        type: 'Flying',
        hp: 40,
        weakness: 'Electric',
        expansion: 'Gen 1',
        attacks: [],
        rarity: 'common'
      }
    ]

    mockCardRepository.getCardById.mockResolvedValue(card)
    mockCardRepository.getCardsByType.mockImplementation((type) => {
      if (type === 'Ground') return Promise.resolve(weaknessCards)
      if (type === 'Flying') return Promise.resolve(resistanceCards)
      return Promise.resolve([])
    })

    const result = await useCase.exec(input)

    expect(result.isSuccessful).toBe(true)
    expect(result.value).toEqual({
      weakAgainst: [{ id: 2, name: 'Onix' }],
      resistantAgainst: [{ id: 3, name: 'Pidgey' }]
    })
  })

  it('should return CardNotFound error if card is not found', async () => {
    const input: GetDamageModifiersInput = { id: 1 }

    mockCardRepository.getCardById.mockResolvedValue(null)

    const result = await useCase.exec(input)

    expect(result.isFailure).toBe(true)
    expect(result).toBeInstanceOf(GetDamageModifiersError.CardNotFound)
  })

  it('should handle unexpected errors', async () => {
    const input: GetDamageModifiersInput = { id: 1 }
    const error = new Error('Unexpected error')

    mockCardRepository.getCardById.mockRejectedValue(error)

    const result = await useCase.exec(input)

    expect(result.isFailure).toBe(true)
    expect(result).toBeInstanceOf(AppError.UnexpectedError)
  })
})
