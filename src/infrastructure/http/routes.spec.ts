import fastify, { FastifyInstance } from 'fastify'
import { router } from './routes'
import { createCardController } from './controllers'

jest.mock('./controllers', () => ({
  createCardController: {
    exec: jest.fn(async (req, reply) => {
      return reply.send({ message: 'Card created successfully' })
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
})
