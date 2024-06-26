import { CardRepository } from '../../domain/repositories/card.repo'
import sequelizeCardRepository from '../../infrastructure/repositories'
import { CreateCardUseCase } from './createCard.uc'

const cardRepository: CardRepository = sequelizeCardRepository
const createCardUseCase = new CreateCardUseCase(cardRepository)

export default createCardUseCase
