import { FastifyReply } from 'fastify'
import { HttpResponse } from './HttpResponse'
import { STATUS_CODES } from 'http'

describe('HttpResponse', () => {
  let httpResponse: HttpResponse
  let mockReply: Partial<FastifyReply>

  beforeEach(() => {
    httpResponse = new HttpResponse()
    mockReply = {
      code: jest.fn().mockReturnThis(),
      type: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should respond with 200 OK', async () => {
    const dto = { message: 'success' }
    await httpResponse.ok(mockReply as FastifyReply, dto)
    expect(mockReply.code).toHaveBeenCalledWith(200)
    expect(mockReply.send).toHaveBeenCalledWith(dto)
  })
  it('should respond with 200 OK without DTO', async () => {
    await httpResponse.ok(mockReply as FastifyReply)
    expect(mockReply.code).toHaveBeenCalledWith(200)
    expect(mockReply.send).toHaveBeenCalledWith(STATUS_CODES[200])
  })

  it('should respond with 201 Created', async () => {
    await httpResponse.created(mockReply as FastifyReply)
    expect(mockReply.code).toHaveBeenCalledWith(201)
    expect(mockReply.send).toHaveBeenCalledWith('Created')
  })

  it('should respond with 400 Bad Request', async () => {
    const errorMsg = 'Bad request'
    await httpResponse.badRequest(mockReply as FastifyReply, errorMsg)
    expect(mockReply.code).toHaveBeenCalledWith(400)
    expect(mockReply.send).toHaveBeenCalledWith({ code: 'Bad Request', message: errorMsg })
  })

  it('should respond with 401 Unauthorized', async () => {
    const errorMsg = 'Unauthorized'
    await httpResponse.unauthorized(mockReply as FastifyReply, errorMsg)
    expect(mockReply.code).toHaveBeenCalledWith(401)
    expect(mockReply.send).toHaveBeenCalledWith({ code: 'Unauthorized', message: errorMsg })
  })

  it('should respond with 403 Forbidden', async () => {
    const errorMsg = 'Forbidden'
    await httpResponse.forbidden(mockReply as FastifyReply, errorMsg)
    expect(mockReply.code).toHaveBeenCalledWith(403)
    expect(mockReply.send).toHaveBeenCalledWith({ code: 'Forbidden', message: errorMsg })
  })

  it('should respond with 404 Not Found', async () => {
    const errorMsg = 'Not Found'
    await httpResponse.notFound(mockReply as FastifyReply, errorMsg)
    expect(mockReply.code).toHaveBeenCalledWith(404)
    expect(mockReply.send).toHaveBeenCalledWith({ code: 'Not Found', message: errorMsg })
  })

  it('should respond with 409 Conflict', async () => {
    const errorMsg = 'Conflict'
    await httpResponse.conflict(mockReply as FastifyReply, errorMsg)
    expect(mockReply.code).toHaveBeenCalledWith(409)
    expect(mockReply.send).toHaveBeenCalledWith({ code: 'Conflict', message: errorMsg })
  })

  it('should respond with 500 Internal Server Error', async () => {
    const errorMsg = 'Internal Server Error'
    await httpResponse.internalServerError(mockReply as FastifyReply, errorMsg)
    expect(mockReply.code).toHaveBeenCalledWith(500)
    expect(mockReply.send).toHaveBeenCalledWith({ code: 'Internal Server Error', message: errorMsg })
  })
})
