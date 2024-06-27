import { CreateCardController } from './createCard'
import { GetAllCardsController } from './getAllCards'
import { UpdateCardController } from './updateCard'
import { GetCardByIdController } from './getCardById'
import { DeleteCardController } from './deleteCard'
import {
  createCardUseCase,
  deleteCardUseCase,
  getAllCardsUseCase,
  getCardByIdUseCase,
  updateCardUseCase
} from '../../../application'

const createCardController = new CreateCardController(createCardUseCase)
const getAllCardsController = new GetAllCardsController(getAllCardsUseCase)
const updateCardController = new UpdateCardController(updateCardUseCase)
const getCardByIdController = new GetCardByIdController(getCardByIdUseCase)
const deleteCardController = new DeleteCardController(deleteCardUseCase)

export {
  createCardController,
  getAllCardsController,
  updateCardController,
  getCardByIdController,
  deleteCardController
}
