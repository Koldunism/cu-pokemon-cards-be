import { GetCardByIdController, GetCardByIdReq } from '.'
import { GetCardByIdError } from '../../../../application/getCardById/getCardById.err'
import { AppError, Result } from '../../../../core'

const mockGetCardByIdUseCase = {
  exec: jest.fn()
} as any

describe('GetCardByIdController', () => {
  let getAllCardsController: GetCardByIdController
  let mockRequest: GetCardByIdReq
  let mockReply: any

  beforeEach(() => {
    getAllCardsController = new GetCardByIdController(mockGetCardByIdUseCase)
    mockRequest = {
      params: {
        id: 1
      }
    } as GetCardByIdReq
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
    mockGetCardByIdUseCase.exec.mockResolvedValue(Result.success({ data: {} }))

    await getAllCardsController.exec(mockRequest, mockReply)

    expect(mockGetCardByIdUseCase.exec).toHaveBeenCalledWith(mockRequest.params)
    expect(mockReply.code).toHaveBeenCalledWith(200)
    expect(mockReply.send).toHaveBeenCalled()
  })

  it('should return 404 if card is not found', async () => {
    const errorResult = new GetCardByIdError.CardNotFound(mockRequest.params.id)

    mockGetCardByIdUseCase.exec.mockResolvedValue(errorResult)

    await getAllCardsController.exec(mockRequest, mockReply)

    expect(mockGetCardByIdUseCase.exec).toHaveBeenCalledWith(mockRequest.params)
    expect(mockReply.code).toHaveBeenCalledWith(404)
    expect(mockReply.send).toHaveBeenCalled()
  })

  it('should return 500 if UC returns unexpected error', async () => {
    const unexpectedError = AppError.UnexpectedError.create('some error')

    mockGetCardByIdUseCase.exec.mockReturnValue(unexpectedError)

    await getAllCardsController.exec(mockRequest, mockReply)

    expect(mockGetCardByIdUseCase.exec).toHaveBeenCalledWith(mockRequest.params)
    expect(mockReply.code).toHaveBeenCalledWith(500)
    expect(mockReply.send).toHaveBeenCalled()
  })
  it('should return 500 if UC throws', async () => {
    const unexpectedError = new Error('Unexpected error')

    mockGetCardByIdUseCase.exec.mockRejectedValue(unexpectedError)

    await getAllCardsController.exec(mockRequest, mockReply)

    expect(mockGetCardByIdUseCase.exec).toHaveBeenCalledWith(mockRequest.params)
    expect(mockReply.code).toHaveBeenCalledWith(500)
    expect(mockReply.send).toHaveBeenCalled()
  })
})
