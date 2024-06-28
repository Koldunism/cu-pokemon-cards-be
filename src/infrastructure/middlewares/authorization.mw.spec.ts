import { FastifyRequest, FastifyReply } from 'fastify'
import * as jwt from 'jsonwebtoken'
import { authMiddleware } from './authorization.mw'
import { HttpResponse } from '../http/httpResponses/HttpResponse'

jest.mock('jsonwebtoken')

describe('authMiddleware', () => {
  let mockRequest: Partial<FastifyRequest>
  let mockReply: Partial<FastifyReply>
  let httpResponse: HttpResponse

  beforeEach(() => {
    mockRequest = {
      headers: {
        authorization: 'Bearer validToken'
      }
    }
    mockReply = {
      code: jest.fn().mockReturnThis(),
      type: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    } as any
    httpResponse = new HttpResponse()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return 401 if token is missing', async () => {
    mockRequest.headers!.authorization = undefined

    await authMiddleware(mockRequest as FastifyRequest, mockReply as FastifyReply)

    expect(mockReply.code).toHaveBeenCalledWith(401)
    expect(mockReply.send).toHaveBeenCalled()
  })

  it('should call jwt.verify with the token', async () => {
    await authMiddleware(mockRequest as FastifyRequest, mockReply as FastifyReply)

    expect(jwt.verify).toHaveBeenCalledWith('validToken', process.env.JWT_SECRET!)
  })

  it('should return 400 if token is invalid', async () => {
    ;(jwt.verify as jest.Mock).mockImplementation(() => {
      throw { name: 'JsonWebTokenError' }
    })

    await authMiddleware(mockRequest as FastifyRequest, mockReply as FastifyReply)

    expect(mockReply.code).toHaveBeenCalledWith(400)
    expect(mockReply.send).toHaveBeenCalled()
  })

  it('should return 401 if token has expired', async () => {
    ;(jwt.verify as jest.Mock).mockImplementation(() => {
      throw { name: 'TokenExpiredError' }
    })

    await authMiddleware(mockRequest as FastifyRequest, mockReply as FastifyReply)

    expect(mockReply.code).toHaveBeenCalledWith(401)
    expect(mockReply.send).toHaveBeenCalled()
  })

  it('should return 401 if token is not active yet', async () => {
    ;(jwt.verify as jest.Mock).mockImplementation(() => {
      throw { name: 'NotBeforeError' }
    })

    await authMiddleware(mockRequest as FastifyRequest, mockReply as FastifyReply)

    expect(mockReply.code).toHaveBeenCalledWith(401)
    expect(mockReply.send).toHaveBeenCalled()
  })

  it('should return 500 for any other error', async () => {
    const unexpectedError = new Error('Unexpected error')
    ;(jwt.verify as jest.Mock).mockImplementation(() => {
      throw unexpectedError
    })

    await authMiddleware(mockRequest as FastifyRequest, mockReply as FastifyReply)

    expect(mockReply.code).toHaveBeenCalledWith(500)
    expect(mockReply.send).toHaveBeenCalled()
  })
})
