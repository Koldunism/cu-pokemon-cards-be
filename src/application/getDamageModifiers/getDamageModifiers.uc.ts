import { AppError, BaseUseCase, Result } from '../../core'
import { CardReference, GetDamageModifiersInput, GetDamageModifiersOutput } from './getDamageModifiers.dto'
import { CardRepository } from '../../domain/repositories/card.repo'
import { GetDamageModifiersError } from './getDamageModifiers.err'

type UseCaseResult = AppError.UnexpectedError | Result<GetDamageModifiersOutput>

export class GetDamageModifiersUseCase extends BaseUseCase<GetDamageModifiersInput, UseCaseResult> {
  private readonly cardRepository: CardRepository

  constructor(cardRepository: CardRepository) {
    super()
    this.cardRepository = cardRepository
  }

  public async exec(useCaseInput: GetDamageModifiersInput) {
    try {
      const { id } = useCaseInput

      const card = await this.cardRepository.getCardById(id)
      if (!card) {
        return new GetDamageModifiersError.CardNotFound(id)
      }

      let weakAgainst: Array<CardReference> = []
      if (card.weakness) {
        const result = await this.cardRepository.getCardsByType(card.weakness)
        weakAgainst = result.map(({ name, id }) => ({ name, id: id! }))
      }

      let resistantAgainst: Array<CardReference> = []
      if (card.resistance) {
        const result = await this.cardRepository.getCardsByType(card.resistance)
        resistantAgainst = result.map(({ name, id }) => ({ name, id: id! }))
      }

      return Result.success<GetDamageModifiersOutput>({ weakAgainst, resistantAgainst })
    } catch (error: any) {
      console.error('Error at GetCardByIdUseCase:', error)
      return AppError.UnexpectedError.create(error)
    }
  }
}
