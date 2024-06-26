import createCardUseCase from '../../../application/createCard'
import { CreateCardController } from './createCard'

const createCardController = new CreateCardController(createCardUseCase)

export { createCardController }
