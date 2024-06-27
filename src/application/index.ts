import { CardRepository } from '../domain/repositories/card.repo'
import sequelizeCardRepository from '../infrastructure/repositories'
import { CreateCardUseCase } from './createCard'
import { DeleteCardUseCase } from './deleteCard'
import { GetAllCardsUseCase } from './getAllCards'
import { GetCardByIdUseCase } from './getCardById'
import { GetDamageModifiersUseCase } from './getDamageModifiers'
import { SimulateBattleUseCase } from './simulateBattle'
import { UpdateCardUseCase } from './updateCard'

const cardRepository: CardRepository = sequelizeCardRepository

const createCardUseCase = new CreateCardUseCase(cardRepository)
const getAllCardsUseCase = new GetAllCardsUseCase(cardRepository)
const updateCardUseCase = new UpdateCardUseCase(cardRepository)
const getCardByIdUseCase = new GetCardByIdUseCase(cardRepository)
const deleteCardUseCase = new DeleteCardUseCase(cardRepository)
const getDamageModifiersUseCase = new GetDamageModifiersUseCase(cardRepository)
const simulateBattleUseCase = new SimulateBattleUseCase()

export {
  createCardUseCase,
  getAllCardsUseCase,
  updateCardUseCase,
  getCardByIdUseCase,
  deleteCardUseCase,
  getDamageModifiersUseCase,
  simulateBattleUseCase
}
