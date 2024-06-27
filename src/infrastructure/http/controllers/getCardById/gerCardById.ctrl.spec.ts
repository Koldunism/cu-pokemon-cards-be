import { GetCardByIdController, GetCardByIdReq } from '.'
import { GetCardByIdError } from '../../../../application/getCardById/getCardById.err'
import { AppError, Result } from '../../../../core'

const mockGetAllCardsUseCase = {
  exec: jest.fn()
} as any

describe('GetCardByIdController', () => {
  let getAllCardsController: GetCardByIdController
  let mockRequest: GetCardByIdReq
  let mockReply: any

  beforeEach(() => {
    getAllCardsController = new GetCardByIdController(mockGetAllCardsUseCase)
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
    mockGetAllCardsUseCase.exec.mockResolvedValue(Result.success({ data: {} }))

    await getAllCardsController.exec(mockRequest, mockReply)

    expect(mockGetAllCardsUseCase.exec).toHaveBeenCalledWith(mockRequest.params)
    expect(mockReply.code).toHaveBeenCalledWith(200)
    expect(mockReply.send).toHaveBeenCalled()
  })

  it('should return 404 if card is not found', async () => {
    const errorResult = new GetCardByIdError.CardNotFound(mockRequest.params.id)

    mockGetAllCardsUseCase.exec.mockResolvedValue(errorResult)

    await getAllCardsController.exec(mockRequest, mockReply)

    expect(mockGetAllCardsUseCase.exec).toHaveBeenCalledWith(mockRequest.params)
    expect(mockReply.code).toHaveBeenCalledWith(404)
    expect(mockReply.send).toHaveBeenCalled()
  })

  it('should return 500 if UC returns unexpected error', async () => {
    const unexpectedError = AppError.UnexpectedError.create('some error')

    mockGetAllCardsUseCase.exec.mockReturnValue(unexpectedError)

    await getAllCardsController.exec(mockRequest, mockReply)

    expect(mockGetAllCardsUseCase.exec).toHaveBeenCalledWith(mockRequest.params)
    expect(mockReply.code).toHaveBeenCalledWith(500)
    expect(mockReply.send).toHaveBeenCalled()
  })
  it('should return 500 if UC throws', async () => {
    const unexpectedError = new Error('Unexpected error')

    mockGetAllCardsUseCase.exec.mockRejectedValue(unexpectedError)

    await getAllCardsController.exec(mockRequest, mockReply)

    expect(mockGetAllCardsUseCase.exec).toHaveBeenCalledWith(mockRequest.params)
    expect(mockReply.code).toHaveBeenCalledWith(500)
    expect(mockReply.send).toHaveBeenCalled()
  })
})
