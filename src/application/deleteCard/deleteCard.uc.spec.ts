import { DeleteCardUseCase } from './deleteCard.uc'
import { CardRepository } from '../../domain/repositories/card.repo'
import { AppError } from '../../core'
import { DeleteCardInput } from './deleteCard.dto'
import { DeleteCardError } from './deleteCard.err'

describe('DeleteCardUseCase', () => {
  let useCase: DeleteCardUseCase
  let mockCardRepository: jest.Mocked<CardRepository>

  beforeEach(() => {
    mockCardRepository = {
      getAllCardsPaginated: jest.fn(),
      createCard: jest.fn(),
      getCardById: jest.fn(),
      updateCard: jest.fn(),
      deleteCard: jest.fn(),
      getCardsByType: jest.fn()
    }

    useCase = new DeleteCardUseCase(mockCardRepository)
  })

  it('should return success true if nothing fails', async () => {
    const input: DeleteCardInput = {
      id: 1
    }

    mockCardRepository.deleteCard.mockResolvedValue(true)

    const result = await useCase.exec(input)

    expect(result.isSuccessful).toBe(true)
    expect(result.value).toEqual({ success: true })
    expect(mockCardRepository.deleteCard).toHaveBeenCalledWith(input.id)
  })

  it('should return DeleteCardError.CardUpdateFailed error if updating fails', async () => {
    const input: DeleteCardInput = {
      id: 1
    }

    mockCardRepository.deleteCard.mockResolvedValue(false)

    const result = await useCase.exec(input)

    expect(result.isFailure).toBe(true)
    expect(result).toBeInstanceOf(DeleteCardError.CardDeletionFailed)
  })

  it('should handle unexpected errors', async () => {
    const input: DeleteCardInput = {
      id: 1
    }

    mockCardRepository.deleteCard.mockRejectedValue(new Error('Unexpected Error'))

    const result = await useCase.exec(input)

    expect(result.isFailure).toBe(true)
    expect(result).toBeInstanceOf(AppError.UnexpectedError)
  })
})
