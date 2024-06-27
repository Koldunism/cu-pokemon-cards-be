import { CreateCardController } from './createCard'
import { GetAllCardsController } from './getAllCards'
import { UpdateCardController } from './updateCard'
import { createCardUseCase, getAllCardsUseCase, getCardByIdUseCase, updateCardUseCase } from '../../../application'
import { GetCardByIdController } from './getCardById'

const createCardController = new CreateCardController(createCardUseCase)
const getAllCardsController = new GetAllCardsController(getAllCardsUseCase)
const updateCardController = new UpdateCardController(updateCardUseCase)
const getCardByIdController = new GetCardByIdController(getCardByIdUseCase)

export { createCardController, getAllCardsController, updateCardController, getCardByIdController }
