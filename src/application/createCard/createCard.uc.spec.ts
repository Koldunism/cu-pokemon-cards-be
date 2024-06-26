import { CreateCardUseCase } from './createCard.uc'
import { CardRepository } from '../../domain/repositories/card.repo'
import { Card } from '../../domain/entities'
import { CreateCardErrors } from './createCard.err'
import { AppError } from '../../core'
import { CreateCardInput } from './createCard.dto'

// Mock del repositorio de cartas
const mockCardRepository: jest.Mocked<CardRepository> = {
  createCard: jest.fn(),
  getAllCardsPaginated: jest.fn(),
  getCardById: jest.fn(),
  updateCard: jest.fn(),
  deleteCard: jest.fn()
}

describe('CreateCardUseCase', () => {
  let createCardUseCase: CreateCardUseCase

  beforeEach(() => {
    createCardUseCase = new CreateCardUseCase(mockCardRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create a card successfuly', async () => {
    const input: CreateCardInput = {
      name: 'Pikachu',
      type: 'Electric',
      hp: 35,
      rarity: 'Common',
      expansion: 'Base Set',
      attacks: [{ name: 'Thunder Shock', power: 40 }],
      weakness: 'Ground',
      resistance: 'Fighting'
    }

    const createdCard: Card = {
      ...input,
      id: 1
    }

    mockCardRepository.createCard.mockResolvedValue(createdCard)

    const result = await createCardUseCase.exec(input)

    expect(result.isSuccessful).toBe(true)
    expect(result.value).toEqual({
      data: createdCard
    })
    expect(mockCardRepository.createCard).toHaveBeenCalledWith(input)
  })

  it('should return CreateCardErrors.CardCreationFailed if creation fails', async () => {
    const input: CreateCardInput = {
      name: 'Pikachu',
      type: 'Electric',
      hp: 35,
      rarity: 'Common',
      expansion: 'Base Set',
      attacks: [{ name: 'Thunder Shock', power: 40 }],
      weakness: 'Ground',
      resistance: 'Fighting'
    }

    mockCardRepository.createCard.mockResolvedValue(null)

    const result = await createCardUseCase.exec(input)

    expect(result.isFailure).toBe(true)
    expect(result).toBeInstanceOf(CreateCardErrors.CardCreationFailed)
    expect(mockCardRepository.createCard).toHaveBeenCalledWith(input)
  })

  it('should return AppError.UnexpectedError if an unexpected error happens', async () => {
    const input: CreateCardInput = {
      name: 'Pikachu',
      type: 'Electric',
      hp: 35,
      rarity: 'Common',
      expansion: 'Base Set',
      attacks: [{ name: 'Thunder Shock', power: 40 }],
      weakness: 'Ground',
      resistance: 'Fighting'
    }

    const unexpectedError = new Error('Unexpected error')
    mockCardRepository.createCard.mockRejectedValue(unexpectedError)

    const result = await createCardUseCase.exec(input)

    expect(result.isFailure).toBe(true)
    expect(result).toBeInstanceOf(AppError.UnexpectedError)
    expect(mockCardRepository.createCard).toHaveBeenCalledWith(input)
  })
})
