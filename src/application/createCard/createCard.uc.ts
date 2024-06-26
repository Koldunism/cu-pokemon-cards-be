import { AppError, BaseUseCase, Result } from "../../core";
import { Card } from "../../domain/entities";
import { CardRepository } from "../../domain/repositories/card.repo";
import { CreateCardInput, CreateCardOutput } from "./createCard.dto";
import { CreateCardErrors } from "./createCard.err";

type UseCaseResult = AppError.UnexpectedError | Result<CreateCardOutput>;

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
      if (!createdCard) {
        return new CreateCardErrors.CardCreationFailed();
      }

      return Result.success<CreateCardOutput>({
        data: createdCard,
      });
    } catch (error: any) {
      return AppError.UnexpectedError.create(error);
    }
  }
}
