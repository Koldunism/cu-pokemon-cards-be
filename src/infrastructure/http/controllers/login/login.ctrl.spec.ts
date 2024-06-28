import { LoginController } from './login.ctrl'
import { LoginError } from '../../../../application/login/login.err'
import { AppError, Result } from '../../../../core'
import { LoginReq } from './login.types'

const mockLoginUseCase = {
  exec: jest.fn()
} as any

describe('LoginController', () => {
  let loginController: LoginController
  let mockRequest: LoginReq
  let mockReply: any

  beforeEach(() => {
    loginController = new LoginController(mockLoginUseCase)
    mockRequest = {
      body: {
        username: 'testuser',
        passwordHash: 'hashedpassword123'
      }
    } as LoginReq
    mockReply = {
      code: jest.fn().mockReturnThis(),
      type: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    } as any
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return 200 if nothing fails', async () => {
    mockLoginUseCase.exec.mockResolvedValue(Result.success({ token: 'validToken' }))

    await loginController.exec(mockRequest, mockReply)

    expect(mockLoginUseCase.exec).toHaveBeenCalledWith(mockRequest.body)
    expect(mockReply.code).toHaveBeenCalledWith(200)
    expect(mockReply.send).toHaveBeenCalledWith({ token: 'validToken' })
  })

  it('should return 401 if login fails', async () => {
    const errorResult = new LoginError.InvalidCredentials()

    mockLoginUseCase.exec.mockResolvedValue(errorResult)

    await loginController.exec(mockRequest, mockReply)

    expect(mockLoginUseCase.exec).toHaveBeenCalledWith(mockRequest.body)
    expect(mockReply.code).toHaveBeenCalledWith(401)
    expect(mockReply.send).toHaveBeenCalled()
  })

  it('should return 500 if UC returns unexpected error', async () => {
    const unexpectedError = AppError.UnexpectedError.create('some error')

    mockLoginUseCase.exec.mockReturnValue(unexpectedError)

    await loginController.exec(mockRequest, mockReply)

    expect(mockLoginUseCase.exec).toHaveBeenCalledWith(mockRequest.body)
    expect(mockReply.code).toHaveBeenCalledWith(500)
  })

  it('should return 500 if UC throws', async () => {
    const unexpectedError = new Error('Unexpected error')

    mockLoginUseCase.exec.mockRejectedValue(unexpectedError)

    await loginController.exec(mockRequest, mockReply)

    expect(mockLoginUseCase.exec).toHaveBeenCalledWith(mockRequest.body)
    expect(mockReply.code).toHaveBeenCalledWith(500)
  })
})
