import { CreateCardController } from './createCard.ctrl'
import { CreateCardErrors } from '../../../../application/createCard/createCard.err'
import { AppError, Result } from '../../../../core'
import { CreateCardReq } from './createCard.types'

const mockCreateCardUseCase = {
  exec: jest.fn()
} as any

describe('CreateCardController', () => {
  let createCardController: CreateCardController
  let mockRequest: CreateCardReq
  let mockReply: any

  beforeEach(() => {
    createCardController = new CreateCardController(mockCreateCardUseCase)
    mockRequest = {
      body: {
        name: 'Pikachu',
        type: 'Electric',
        hp: 35,
        rarity: 'Common',
        expansion: 'Base Set',
        attacks: [{ name: 'Thunder Shock', power: 40 }],
        weakness: 'Ground',
        resistance: 'Fighting'
      }
    } as CreateCardReq
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
    mockCreateCardUseCase.exec.mockResolvedValue(Result.success({ data: {} }))

    await createCardController.exec(mockRequest, mockReply)

    expect(mockCreateCardUseCase.exec).toHaveBeenCalledWith(mockRequest.body)
    expect(mockReply.code).toHaveBeenCalledWith(200)
    expect(mockReply.send).toHaveBeenCalled()
  })

  it('should return 409 if creation fails', async () => {
    const errorResult = new CreateCardErrors.CardCreationFailed()

    mockCreateCardUseCase.exec.mockResolvedValue(errorResult)

    await createCardController.exec(mockRequest, mockReply)

    expect(mockCreateCardUseCase.exec).toHaveBeenCalledWith(mockRequest.body)
    expect(mockReply.code).toHaveBeenCalledWith(409)
    expect(mockReply.send).toHaveBeenCalled()
  })

  it('should return 500 if UC returns unexpected error', async () => {
    const unexpectedError = AppError.UnexpectedError.create('some error')

    mockCreateCardUseCase.exec.mockReturnValue(unexpectedError)

    await createCardController.exec(mockRequest, mockReply)

    expect(mockCreateCardUseCase.exec).toHaveBeenCalledWith(mockRequest.body)
    expect(mockReply.code).toHaveBeenCalledWith(500)
    expect(mockReply.send).toHaveBeenCalled()
  })
  it('should return 500 if UC throws', async () => {
    const unexpectedError = new Error('Unexpected error')

    mockCreateCardUseCase.exec.mockRejectedValue(unexpectedError)

    await createCardController.exec(mockRequest, mockReply)

    expect(mockCreateCardUseCase.exec).toHaveBeenCalledWith(mockRequest.body)
    expect(mockReply.code).toHaveBeenCalledWith(500)
    expect(mockReply.send).toHaveBeenCalled()
  })
})
