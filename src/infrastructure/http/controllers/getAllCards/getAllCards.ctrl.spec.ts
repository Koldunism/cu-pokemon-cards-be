import { GetAllCardsController, GetAllCardsReq } from '.'
import { GetAllCardsError } from '../../../../application/getAllCards/getAllCards.err'

import { AppError, Result } from '../../../../core'

const mockGetAllCardsUseCase = {
  exec: jest.fn()
} as any

describe('GetAllCardsController', () => {
  let getAllCardsController: GetAllCardsController
  let mockRequest: GetAllCardsReq
  let mockReply: any

  beforeEach(() => {
    getAllCardsController = new GetAllCardsController(mockGetAllCardsUseCase)
    mockRequest = {
      query: {
        limit: 1,
        offset: 0,
        sortBy: 'name',
        order: 'desc'
      }
    } as GetAllCardsReq
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

    expect(mockGetAllCardsUseCase.exec).toHaveBeenCalledWith(mockRequest.query)
    expect(mockReply.code).toHaveBeenCalledWith(200)
    expect(mockReply.send).toHaveBeenCalled()
  })

  it('should return 500 if searching fails', async () => {
    const errorResult = new GetAllCardsError.CardsSearchFailed()

    mockGetAllCardsUseCase.exec.mockResolvedValue(errorResult)

    await getAllCardsController.exec(mockRequest, mockReply)

    expect(mockGetAllCardsUseCase.exec).toHaveBeenCalledWith(mockRequest.query)
    expect(mockReply.code).toHaveBeenCalledWith(500)
    expect(mockReply.send).toHaveBeenCalled()
  })

  it('should return 500 if UC returns unexpected error', async () => {
    const unexpectedError = AppError.UnexpectedError.create('some error')

    mockGetAllCardsUseCase.exec.mockReturnValue(unexpectedError)

    await getAllCardsController.exec(mockRequest, mockReply)

    expect(mockGetAllCardsUseCase.exec).toHaveBeenCalledWith(mockRequest.query)
    expect(mockReply.code).toHaveBeenCalledWith(500)
    expect(mockReply.send).toHaveBeenCalled()
  })
  it('should return 500 if UC throws', async () => {
    const unexpectedError = new Error('Unexpected error')

    mockGetAllCardsUseCase.exec.mockRejectedValue(unexpectedError)

    await getAllCardsController.exec(mockRequest, mockReply)

    expect(mockGetAllCardsUseCase.exec).toHaveBeenCalledWith(mockRequest.query)
    expect(mockReply.code).toHaveBeenCalledWith(500)
    expect(mockReply.send).toHaveBeenCalled()
  })
})
