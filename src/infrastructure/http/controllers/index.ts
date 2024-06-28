import { CreateCardController } from './createCard'
import { GetAllCardsController } from './getAllCards'
import { UpdateCardController } from './updateCard'
import { GetCardByIdController } from './getCardById'
import { DeleteCardController } from './deleteCard'
import { GetDamageModifiersController } from './getDamageModifiers/getDamageModifiers.ctrl'
import {
  createCardUseCase,
  deleteCardUseCase,
  getAllCardsUseCase,
  getCardByIdUseCase,
  getDamageModifiersUseCase,
  loginUseCase,
  simulateBattleUseCase,
  updateCardUseCase
} from '../../../application'
import { SimulateBattleController } from './simulateBattle'
import { LoginController } from './login'

const createCardController = new CreateCardController(createCardUseCase)
const getAllCardsController = new GetAllCardsController(getAllCardsUseCase)
const updateCardController = new UpdateCardController(updateCardUseCase)
const getCardByIdController = new GetCardByIdController(getCardByIdUseCase)
const deleteCardController = new DeleteCardController(deleteCardUseCase)
const getDamageModifiersController = new GetDamageModifiersController(getDamageModifiersUseCase)
const simulateBattleController = new SimulateBattleController(getCardByIdUseCase, simulateBattleUseCase)
const loginController = new LoginController(loginUseCase)
export {
  createCardController,
  getAllCardsController,
  updateCardController,
  getCardByIdController,
  deleteCardController,
  getDamageModifiersController,
  simulateBattleController,
  loginController
}
