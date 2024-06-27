import { UpdateCardUseCase } from './updateCard.uc'
import { CardRepository } from '../../domain/repositories/card.repo'
import { AppError } from '../../core'
import { UpdateCardInput, UpdateCardOutput } from './updateCard.dto'
import { UpdateCardError } from './updateCard.err'

describe('UpdateCardUseCase', () => {
  let useCase: UpdateCardUseCase
  let mockCardRepository: jest.Mocked<CardRepository>

  beforeEach(() => {
    mockCardRepository = {
      getAllCardsPaginated: jest.fn(),
      createCard: jest.fn(),
      getCardById: jest.fn(),
      updateCard: jest.fn(),
      deleteCard: jest.fn()
    }

    useCase = new UpdateCardUseCase(mockCardRepository)
  })

  it('should return success true if nothing fails', async () => {
    const input: UpdateCardInput = {
      id: 1,
      name: 'Pinsir'
    }

    mockCardRepository.updateCard.mockResolvedValue(true)

    const result = await useCase.exec(input)

    expect(result.isSuccessful).toBe(true)
    expect(result.value).toEqual({ success: true })
    expect(mockCardRepository.updateCard).toHaveBeenCalledWith(input)
  })

  it('should return UpdateCardError.CardUpdateFailed error if updating fails', async () => {
    const input: UpdateCardInput = {
      id: 1,
      name: 'Pinsir'
    }

    mockCardRepository.updateCard.mockResolvedValue(false)

    const result = await useCase.exec(input)

    expect(result.isFailure).toBe(true)
    expect(result).toBeInstanceOf(UpdateCardError.CardUpdateFailed)
  })

  it('should handle unexpected errors', async () => {
    const input: UpdateCardInput = {
      id: 1,
      name: 'Pinsir'
    }

    mockCardRepository.updateCard.mockRejectedValue(new Error('Unexpected Error'))

    const result = await useCase.exec(input)

    expect(result.isFailure).toBe(true)
    expect(result).toBeInstanceOf(AppError.UnexpectedError)
  })
})
