import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { createCardSchema, CreateCardReq } from './controllers/createCard'
import { GetAllCardsReq, getAllCardsSchema } from './controllers/getAllCards'
import { UpdateCardReq, updateCardSchema } from './controllers/updateCard'
import { GetCardByIdReq, getCardByIdSchema } from './controllers/getCardById'
import { DeleteCardReq, deleteCardSchema } from './controllers/deleteCard'
import {
  createCardController,
  deleteCardController,
  getAllCardsController,
  getCardByIdController,
  getDamageModifiersController,
  loginController,
  simulateBattleController,
  updateCardController
} from './controllers'
import { GetDamageModifiersReq, getDamageModifiersSchema } from './controllers/getDamageModifiers'
import { SimulateBattleReq, simulateBattleSchema } from './controllers/simulateBattle'
import { LoginReq, loginSchema } from './controllers/login'

const cardsBasePath = '/cards'

export const router = async (app: FastifyInstance) => {
  app.route({
    url: '/health',
    method: ['HEAD', 'GET'],
    handler: async (req: FastifyRequest, reply: FastifyReply) => reply.code(200).send({ status: 'OK' })
  })

  app.route({
    url: '/login',
    method: ['POST'],
    schema: loginSchema,
    handler: async (req: LoginReq, reply: FastifyReply) => loginController.exec(req, reply)
  })

  app.route({
    url: cardsBasePath,
    method: 'POST',
    schema: createCardSchema,
    handler: async (req: CreateCardReq, reply: FastifyReply) => createCardController.exec(req, reply)
  })

  app.route({
    url: cardsBasePath,
    method: 'GET',
    schema: getAllCardsSchema,
    handler: async (req: GetAllCardsReq, reply: FastifyReply) => getAllCardsController.exec(req, reply)
  })

  app.route({
    url: `${cardsBasePath}/:id`,
    method: 'PATCH',
    schema: updateCardSchema,
    handler: async (req: UpdateCardReq, reply: FastifyReply) => updateCardController.exec(req, reply)
  })

  app.route({
    url: `${cardsBasePath}/:id`,
    method: 'GET',
    schema: getCardByIdSchema,
    handler: async (req: GetCardByIdReq, reply: FastifyReply) => getCardByIdController.exec(req, reply)
  })

  app.route({
    url: `${cardsBasePath}/:id`,
    method: 'DELETE',
    schema: deleteCardSchema,
    handler: async (req: DeleteCardReq, reply: FastifyReply) => deleteCardController.exec(req, reply)
  })

  app.route({
    url: `${cardsBasePath}/:id/damage-modifiers`,
    method: 'GET',
    schema: getDamageModifiersSchema,
    handler: async (req: GetDamageModifiersReq, reply: FastifyReply) => getDamageModifiersController.exec(req, reply)
  })

  app.route({
    url: `${cardsBasePath}/battle`,
    method: 'GET',
    schema: simulateBattleSchema,
    handler: async (req: SimulateBattleReq, reply: FastifyReply) => simulateBattleController.exec(req, reply)
  })
}
