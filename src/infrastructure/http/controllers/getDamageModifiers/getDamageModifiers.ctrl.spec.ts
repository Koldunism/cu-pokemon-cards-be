import { GetDamageModifiersController, GetDamageModifiersReq } from '.'
import { GetDamageModifiersError } from '../../../../application/getDamageModifiers/getDamageModifiers.err'
import { AppError, Result } from '../../../../core'

const mockGetDamageModifiersUseCase = {
  exec: jest.fn()
} as any

describe('GetDamageModifiersController', () => {
  let getAllCardsController: GetDamageModifiersController
  let mockRequest: GetDamageModifiersReq
  let mockReply: any

  beforeEach(() => {
    getAllCardsController = new GetDamageModifiersController(mockGetDamageModifiersUseCase)
    mockRequest = {
      params: {
        id: 1
      }
    } as GetDamageModifiersReq
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
    mockGetDamageModifiersUseCase.exec.mockResolvedValue(Result.success({ data: {} }))

    await getAllCardsController.exec(mockRequest, mockReply)

    expect(mockGetDamageModifiersUseCase.exec).toHaveBeenCalledWith(mockRequest.params)
    expect(mockReply.code).toHaveBeenCalledWith(200)
    expect(mockReply.send).toHaveBeenCalled()
  })

  it('should return 404 if card is not found', async () => {
    const errorResult = new GetDamageModifiersError.CardNotFound(mockRequest.params.id)

    mockGetDamageModifiersUseCase.exec.mockResolvedValue(errorResult)

    await getAllCardsController.exec(mockRequest, mockReply)

    expect(mockGetDamageModifiersUseCase.exec).toHaveBeenCalledWith(mockRequest.params)
    expect(mockReply.code).toHaveBeenCalledWith(404)
    expect(mockReply.send).toHaveBeenCalled()
  })

  it('should return 500 if UC returns unexpected error', async () => {
    const unexpectedError = AppError.UnexpectedError.create('some error')

    mockGetDamageModifiersUseCase.exec.mockReturnValue(unexpectedError)

    await getAllCardsController.exec(mockRequest, mockReply)

    expect(mockGetDamageModifiersUseCase.exec).toHaveBeenCalledWith(mockRequest.params)
    expect(mockReply.code).toHaveBeenCalledWith(500)
    expect(mockReply.send).toHaveBeenCalled()
  })
  it('should return 500 if UC throws', async () => {
    const unexpectedError = new Error('Unexpected error')

    mockGetDamageModifiersUseCase.exec.mockRejectedValue(unexpectedError)

    await getAllCardsController.exec(mockRequest, mockReply)

    expect(mockGetDamageModifiersUseCase.exec).toHaveBeenCalledWith(mockRequest.params)
    expect(mockReply.code).toHaveBeenCalledWith(500)
    expect(mockReply.send).toHaveBeenCalled()
  })
})
