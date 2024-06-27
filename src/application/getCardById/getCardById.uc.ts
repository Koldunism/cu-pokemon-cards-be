import { Result, AppError, BaseUseCase } from '../../core'
import { GetCardByIdOutput, GetCardByIdInput } from './getCardById.dto'
import { CardRepository } from '../../domain/repositories/card.repo'
import { GetCardByIdError } from './getCardById.err'

type UseCaseResult = AppError.UnexpectedError | GetCardByIdError.CardNotFound | Result<GetCardByIdOutput>

export class GetCardByIdUseCase extends BaseUseCase<GetCardByIdInput, UseCaseResult> {
  private readonly cardRepository: CardRepository

  constructor(cardRepository: CardRepository) {
    super()
    this.cardRepository = cardRepository
  }

  public async exec(getCardByIdInput: GetCardByIdInput) {
    try {
      const { id } = getCardByIdInput

      const card = await this.cardRepository.getCardById(id)
      if (!card) {
        return new GetCardByIdError.CardNotFound(id)
      }

      return Result.success<GetCardByIdOutput>({ data: card })
    } catch (error: any) {
      console.error('Error at GetCardByIdUseCase:', error)
      return AppError.UnexpectedError.create(error)
    }
  }
}
