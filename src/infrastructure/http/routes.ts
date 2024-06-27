import { FastifyInstance, FastifyReply } from 'fastify'
import { createCardSchema, CreateCardReq } from './controllers/createCard'
import { GetAllCardsReq, getAllCardsSchema } from './controllers/getAllCards'
import { UpdateCardReq, updateCardSchema } from './controllers/updateCard'
import { createCardController, getAllCardsController, updateCardController } from './controllers'

const cardsBasePath = '/cards'

export const router = async (app: FastifyInstance) => {
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
}
