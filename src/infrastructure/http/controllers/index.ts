import { CreateCardController } from './createCard'
import { GetAllCardsController } from './getAllCards'
import { UpdateCardController } from './updateCard'
import { createCardUseCase, getAllCardsUseCase, updateCardUseCase } from '../../../application'

const createCardController = new CreateCardController(createCardUseCase)
const getAllCardsController = new GetAllCardsController(getAllCardsUseCase)
const updateCardController = new UpdateCardController(updateCardUseCase)

export { createCardController, getAllCardsController, updateCardController }
