import { GetAllCardsUseCase } from './getAllCards.uc'
import { CardRepository } from '../../domain/repositories/card.repo'
import { AppError } from '../../core'
import { GetAllCardsInput, GetAllCardsOutput } from './getAllCards.dto'
import { GetAllCardsError } from './getAllCards.err'

describe('GetAllCardsUseCase', () => {
  let useCase: GetAllCardsUseCase
  let mockCardRepository: jest.Mocked<CardRepository>

  beforeEach(() => {
    mockCardRepository = {
      getAllCardsPaginated: jest.fn(),
      createCard: jest.fn(),
      getCardById: jest.fn(),
      updateCard: jest.fn(),
      deleteCard: jest.fn()
    }

    useCase = new GetAllCardsUseCase(mockCardRepository)
  })

  it('should return paginated cards successfully', async () => {
    const input: GetAllCardsInput = {
      limit: 10,
      offset: 0,
      sortBy: 'name',
      order: 'asc'
    }

    const paginatedCards = {
      offset: 0,
      limit: 10,
      total: 100,
      hasNext: true,
      data: [
        {
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
      ],
      sortBy: 'name',
      order: 'asc'
    }

    mockCardRepository.getAllCardsPaginated.mockResolvedValue(paginatedCards)

    const result = await useCase.exec(input)

    expect(result.isSuccessful).toBe(true)
    expect(result.value).toEqual(paginatedCards)
    expect(mockCardRepository.getAllCardsPaginated).toHaveBeenCalledWith(input)
  })

  it('should return CardsSearchFailed error if no cards found', async () => {
    const input: GetAllCardsInput = {
      limit: 10,
      offset: 0,
      sortBy: 'name',
      order: 'asc'
    }

    mockCardRepository.getAllCardsPaginated.mockResolvedValue(null)

    const result = await useCase.exec(input)

    expect(result.isFailure).toBe(true)
    expect(result).toBeInstanceOf(GetAllCardsError.CardsSearchFailed)
  })

  it('should handle unexpected errors', async () => {
    const input: GetAllCardsInput = {
      limit: 10,
      offset: 0,
      sortBy: 'name',
      order: 'asc'
    }

    mockCardRepository.getAllCardsPaginated.mockRejectedValue(new Error('Unexpected Error'))

    const result = await useCase.exec(input)

    expect(result.isFailure).toBe(true)
    expect(result).toBeInstanceOf(AppError.UnexpectedError)
  })
})
