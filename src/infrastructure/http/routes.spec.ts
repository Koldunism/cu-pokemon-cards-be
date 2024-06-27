import fastify, { FastifyInstance } from 'fastify'
import { router } from './routes'
import {
  createCardController,
  deleteCardController,
  getAllCardsController,
  getCardByIdController,
  getDamageModifiersController,
  updateCardController
} from './controllers'

jest.mock('./controllers', () => ({
  createCardController: {
    exec: jest.fn(async (req, reply) => {
      return reply.send({ message: 'Card created successfully' })
    })
  },
  getAllCardsController: {
    exec: jest.fn(async (req, reply) => {
      return reply.send({ message: 'List retrieved' })
    })
  },
  updateCardController: {
    exec: jest.fn(async (req, reply) => {
      return reply.send({ message: 'Card updated' })
    })
  },
  getCardByIdController: {
    exec: jest.fn(async (req, reply) => {
      return reply.send({ message: 'Card obtained' })
    })
  },
  deleteCardController: {
    exec: jest.fn(async (req, reply) => {
      return reply.send({ message: 'Card deleted' })
    })
  },
  getDamageModifiersController: {
    exec: jest.fn(async (req, reply) => {
      return reply.send({ message: 'Cards obtained' })
    })
  }
}))

describe('router', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = fastify()
    await router(app)
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should register POST /cards route', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/cards',
      payload: {
        name: 'Pikachu',
        type: 'electric',
        hp: 35,
        rarity: 'common',
        attacks: [
          { name: 'Thunder Shock', power: 40 },
          { name: 'Quick Attack', power: 30 }
        ],
        expansion: 'Base Set',
        weakness: 'ground',
        resistance: 'flying',
        defense: 50
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({ message: 'Card created successfully' })
    expect(createCardController.exec).toHaveBeenCalled()
  })

  it('should validate request payload for POST /cards route', async () => {
    const invalidPayload = {
      type: 'electric',
      hp: 35,
      rarity: 'common',
      attacks: [
        { name: 'Thunder Shock', power: 40 },
        { name: 'Quick Attack', power: 30 }
      ],
      expansion: 'Base Set',
      weakness: 'ground',
      resistance: 'flying',
      defense: 50
    }

    const response = await app.inject({
      method: 'POST',
      url: '/cards',
      payload: invalidPayload
    })

    expect(response.statusCode).toBe(400)
  })

  it('should register GET /cards route', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/cards',
      query: {
        limit: '10',
        offset: '0',
        sortBy: 'name',
        order: 'asc'
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({ message: 'List retrieved' })
    expect(getAllCardsController.exec).toHaveBeenCalled()
  })

  it('should validate request query for GET /cards route', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/cards',
      query: {
        limit: '-1',
        offset: '0',
        sortBy: 'invalidField',
        order: 'asc'
      }
    })

    expect(response.statusCode).toBe(400)
  })

  it('should register PATCH /cards/:id route', async () => {
    const response = await app.inject({
      method: 'PATCH',
      url: '/cards/1',
      payload: {
        name: 'Pinsir'
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({ message: 'Card updated' })
    expect(getAllCardsController.exec).toHaveBeenCalled()
  })

  it('should validate request for PATCH /cards/:id route', async () => {
    const response = await app.inject({
      method: 'PATCH',
      url: '/cards/1',
      payload: {
        defense: 'wrong'
      }
    })

    expect(response.statusCode).toBe(400)
  })

  it('should validate request for GET /cards/:id route', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/cards/a'
    })

    expect(response.statusCode).toBe(400)
  })

  it('should register GET /cards/:id route', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/cards/1'
    })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({ message: 'Card obtained' })
    expect(getAllCardsController.exec).toHaveBeenCalled()
  })

  it('should register DELETE /cards/:id route', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: '/cards/1'
    })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({ message: 'Card deleted' })
    expect(getAllCardsController.exec).toHaveBeenCalled()
  })

  it('should validate request for DELETE /cards/:id route', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: '/cards/a'
    })

    expect(response.statusCode).toBe(400)
  })

  it('should validate request for GET /cards/:id/damage-modifiers route', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/cards/damage-modifiers'
    })

    expect(response.statusCode).toBe(400)
  })

  it('should register GET /cards/:id route', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/cards/1/damage-modifiers'
    })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({ message: 'Cards obtained' })
    expect(getAllCardsController.exec).toHaveBeenCalled()
  })
})
