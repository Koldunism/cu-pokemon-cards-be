import { AppError, BaseUseCase, Result } from '../../core'
import { CardRepository } from '../../domain/repositories/card.repo'
import { DeleteCardInput, DeleteCardOutput } from './deleteCard.dto'
import { DeleteCardError } from './deleteCard.err'

type UseCaseResult = AppError.UnexpectedError | Result<DeleteCardOutput>

export class DeleteCardUseCase extends BaseUseCase<DeleteCardInput, UseCaseResult> {
  private readonly cardRepository: CardRepository

  constructor(cardRepository: CardRepository) {
    super()
    this.cardRepository = cardRepository
  }

  public async exec(deleteCardInput: DeleteCardInput) {
    try {
      const { id } = deleteCardInput

      const isSuccessful = await this.cardRepository.deleteCard(id)
      if (!isSuccessful) {
        return new DeleteCardError.CardDeletionFailed()
      }
      return Result.success<DeleteCardOutput>({ success: isSuccessful })
    } catch (error: any) {
      console.error('Error at DeleteCardUseCase:', error)
      return AppError.UnexpectedError.create(error)
    }
  }
}
