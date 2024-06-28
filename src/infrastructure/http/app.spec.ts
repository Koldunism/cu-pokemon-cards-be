import { start } from './app'
import { FASTIFYCONFIG } from '../../config'
import * as crypto from 'crypto'
import { FastifyInstance } from 'fastify'
import { authMiddleware } from '../middlewares/authorization.mw'
import { loginController } from './controllers'

jest.mock('crypto')
jest.mock('../middlewares/authorization.mw')
jest.mock('./controllers')

describe('app start', () => {
  let app: FastifyInstance

  beforeAll(() => {
    app = start(FASTIFYCONFIG)
  })

  afterAll(() => {
    app.close()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should reply with 200 on /health', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/health'
    })

    expect(res.statusCode).toBe(200)
  })

  it('should call authMiddleware on routes that require authentication', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/cards/1'
    })

    expect(authMiddleware).toHaveBeenCalled()
    expect(res.statusCode).toBe(200)
  })

  it('should hash password on /login route', async () => {
    const password = 'plainpassword'
    const hashedPassword = 'hashedpassword'
    ;(crypto.createHash as jest.Mock).mockReturnValue({
      update: jest.fn().mockReturnThis(),
      digest: jest.fn().mockReturnValue(hashedPassword)
    })

    const res = await app.inject({
      method: 'POST',
      url: '/login',
      payload: { passwordHash: password, username: 'user' }
    })

    expect(crypto.createHash).toHaveBeenCalledWith(process.env.HASH_ALG)
    expect(res.statusCode).toBe(200)
  })

  it('should not hash password on routes other than /login', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/health'
    })

    expect(crypto.createHash).not.toHaveBeenCalled()
    expect(res.statusCode).toBe(200)
  })
})
