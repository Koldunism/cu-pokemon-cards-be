import { CardRepository } from '../domain/repositories/card.repo'
import sequelizeCardRepository from '../infrastructure/repositories'
import { CreateCardUseCase } from './createCard'
import { GetAllCardsUseCase } from './getAllCards'

const cardRepository: CardRepository = sequelizeCardRepository

const createCardUseCase = new CreateCardUseCase(cardRepository)
const getAllCardsUseCase = new GetAllCardsUseCase(cardRepository)

export { createCardUseCase, getAllCardsUseCase }
