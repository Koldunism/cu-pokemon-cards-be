import { AppError, BaseUseCase, Result } from '../../core'
import { GetAllCardsInput, GetAllCardsOutput } from './getAllCards.dto'
import { CardRepository } from '../../domain/repositories/card.repo'
import { GetAllCardsError } from './getAllCards.err'

type UseCaseResult = AppError.UnexpectedError | Result<any>

export class GetAllCardsUseCase extends BaseUseCase<GetAllCardsInput, UseCaseResult> {
  private readonly cardRepository: CardRepository

  constructor(cardRepository: CardRepository) {
    super()
    this.cardRepository = cardRepository
  }

  public async exec(getAllCardsInput: GetAllCardsInput) {
    try {
      const { sortBy, order } = getAllCardsInput
      const paginatedCards = await this.cardRepository.getAllCardsPaginated(getAllCardsInput)

      if (!paginatedCards) {
        return new GetAllCardsError.CardsSearchFailed()
      }

      return Result.success<GetAllCardsOutput>({ ...paginatedCards, sortBy, order })
    } catch (error: any) {
      console.error('Error at GetAllCardsUseCase:', error)
      return AppError.UnexpectedError.create(error)
    }
  }
}
