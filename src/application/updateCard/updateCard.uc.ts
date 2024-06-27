import { AppError, BaseUseCase, Result } from '../../core'
import { UpdateCardInput, UpdateCardOutput } from './updateCard.dto'
import { CardRepository } from '../../domain/repositories/card.repo'
import { Card } from '../../domain/entities'
import { CreateCardInput } from '../createCard'
import { UpdateCardError } from './updateCard.err'

type UseCaseResult = AppError.UnexpectedError | Result<UpdateCardOutput>

export class UpdateCardUseCase extends BaseUseCase<CreateCardInput, UseCaseResult> {
  private readonly cardRepository: CardRepository

  constructor(cardRepository: CardRepository) {
    super()
    this.cardRepository = cardRepository
  }

  public async exec(input: UpdateCardInput) {
    try {
      const cardToUpdate: Partial<Card> = input

      const isSuccessful = await this.cardRepository.updateCard(cardToUpdate)
      if (!isSuccessful) {
        return new UpdateCardError.CardUpdateFailed()
      }

      return Result.success<UpdateCardOutput>({ success: isSuccessful })
    } catch (error: any) {
      console.error('Error at UpdateCardUseCase:', error)
      return AppError.UnexpectedError.create(error)
    }
  }
}
