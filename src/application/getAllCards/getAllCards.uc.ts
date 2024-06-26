import { AppError, BaseUseCase, Result } from '../../core'
import { GetAllCardsInput, GetAllCardsOutput } from './getAllCards.dto'
import { CardFilters, CardRepository, DataLimiters } from '../../domain/repositories/card.repo'
import { GetAllCardsError } from './getAllCards.err'

type UseCaseResult = AppError.UnexpectedError | GetAllCardsError.CardsSearchFailed | Result<GetAllCardsOutput>

export class GetAllCardsUseCase extends BaseUseCase<GetAllCardsInput, UseCaseResult> {
  private readonly cardRepository: CardRepository

  constructor(cardRepository: CardRepository) {
    super()
    this.cardRepository = cardRepository
  }

  public async exec(getAllCardsInput: GetAllCardsInput & CardFilters) {
    try {
      const { sortBy, order, limit, offset, ...filters } = getAllCardsInput
      const dataLimiters: DataLimiters = { sortBy, order, limit, offset }

      const paginatedCards = await this.cardRepository.getAllCardsPaginated(dataLimiters, filters)

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
