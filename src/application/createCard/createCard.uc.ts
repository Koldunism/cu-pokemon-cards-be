import { AppError, BaseUseCase, Result } from "../../core";
import { Card } from "../../domain/entities";
import { CardRepository } from "../../domain/repositories/card.repo";
import { CreateCardInput } from "./createCard.dto";

// TODO: CreateCardOutput
type UseCaseResult = AppError.UnexpectedError | Result<any>;

export class CreateCardUseCase extends BaseUseCase<
  CreateCardInput,
  UseCaseResult
> {
  private readonly cardRepository: CardRepository;

  constructor(cardRepository: CardRepository) {
    super();
    this.cardRepository = cardRepository;
  }

  public async exec(createCardInput: CreateCardInput) {
    try {
      const cardToCreate: Card = createCardInput;

      const createdCard = await this.cardRepository.createCard(cardToCreate);

      return Result.success<any>({
        result: createdCard,
      });
    } catch (error: any) {
      return AppError.UnexpectedError.create(error);
    }
  }
}
