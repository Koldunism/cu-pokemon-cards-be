import { CreateCardController } from './createCard'
import { GetAllCardsController } from './getAllCards'
import { createCardUseCase, getAllCardsUseCase } from '../../../application'

const createCardController = new CreateCardController(createCardUseCase)
const getAllCardsController = new GetAllCardsController(getAllCardsUseCase)

export { createCardController, getAllCardsController }
