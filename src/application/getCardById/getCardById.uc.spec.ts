import { GetCardByIdUseCase } from './getCardById.uc'
import { CardRepository } from '../../domain/repositories/card.repo'
import { AppError } from '../../core'
import { GetCardByIdInput } from './getCardById.dto'
import { GetCardByIdError } from './getCardById.err'

describe('GetCardByIdUseCase', () => {
  let useCase: GetCardByIdUseCase
  let mockCardRepository: jest.Mocked<CardRepository>

  beforeEach(() => {
    mockCardRepository = {
      getAllCardsPaginated: jest.fn(),
      createCard: jest.fn(),
      getCardById: jest.fn(),
      updateCard: jest.fn(),
      deleteCard: jest.fn()
    }

    useCase = new GetCardByIdUseCase(mockCardRepository)
  })

  it('should return card successfully', async () => {
    const input: GetCardByIdInput = {
      id: 1
    }

    const card = {
      id: 1,
      name: 'Pikachu',
      type: 'Electric',
      hp: 35,
      rarity: 'Common',
      expansion: 'Base Set',
      attacks: [{ name: 'Thunder Shock', power: 40 }],
      weakness: 'Ground',
      resistance: 'Flying',
      defense: 10
    }

    mockCardRepository.getCardById.mockResolvedValue(card)

    const result = await useCase.exec(input)

    expect(result.isSuccessful).toBe(true)
    expect(result.value).toEqual({ data: card })
    expect(mockCardRepository.getCardById).toHaveBeenCalledWith(input.id)
  })

  it('should return GetCardByIdError.CardNotFound error if DB returns null', async () => {
    const input: GetCardByIdInput = {
      id: 1
    }

    mockCardRepository.getCardById.mockResolvedValue(null)

    const result = await useCase.exec(input)

    expect(result.isFailure).toBe(true)
    expect(result).toBeInstanceOf(GetCardByIdError.CardNotFound)
  })

  it('should handle unexpected errors', async () => {
    const input: GetCardByIdInput = {
      id: 1
    }

    mockCardRepository.getCardById.mockRejectedValue(new Error('Unexpected Error'))

    const result = await useCase.exec(input)

    expect(result.isFailure).toBe(true)
    expect(result).toBeInstanceOf(AppError.UnexpectedError)
  })
})
