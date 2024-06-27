import { UpdateCardController, UpdateCardReq } from '.'
import { GetAllCardsError } from '../../../../application/getAllCards/getAllCards.err'

import { AppError, Result } from '../../../../core'

const mockGetAllCardsUseCase = {
  exec: jest.fn()
} as any

describe('UpdateCardController', () => {
  let updateCardController: UpdateCardController
  let mockRequest: UpdateCardReq
  let mockReply: any

  beforeEach(() => {
    updateCardController = new UpdateCardController(mockGetAllCardsUseCase)
    mockRequest = {
      params: {
        id: 1
      },
      body: {
        name: 'Pinsir'
      }
    } as UpdateCardReq
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
    mockGetAllCardsUseCase.exec.mockResolvedValue(Result.success({ success: true }))

    await updateCardController.exec(mockRequest, mockReply)

    expect(mockGetAllCardsUseCase.exec).toHaveBeenCalled()
    expect(mockReply.code).toHaveBeenCalledWith(200)
    expect(mockReply.send).toHaveBeenCalled()
  })

  it('should return 500 if updating fails', async () => {
    const errorResult = new GetAllCardsError.CardsSearchFailed()

    mockGetAllCardsUseCase.exec.mockResolvedValue(errorResult)

    await updateCardController.exec(mockRequest, mockReply)

    expect(mockGetAllCardsUseCase.exec).toHaveBeenCalled()
    expect(mockReply.code).toHaveBeenCalledWith(500)
    expect(mockReply.send).toHaveBeenCalled()
  })

  it('should return 500 if UC returns unexpected error', async () => {
    const unexpectedError = AppError.UnexpectedError.create('some error')

    mockGetAllCardsUseCase.exec.mockReturnValue(unexpectedError)

    await updateCardController.exec(mockRequest, mockReply)

    expect(mockGetAllCardsUseCase.exec).toHaveBeenCalled()
    expect(mockReply.code).toHaveBeenCalledWith(500)
    expect(mockReply.send).toHaveBeenCalled()
  })
  it('should return 500 if UC throws', async () => {
    const unexpectedError = new Error('Unexpected error')

    mockGetAllCardsUseCase.exec.mockRejectedValue(unexpectedError)

    await updateCardController.exec(mockRequest, mockReply)

    expect(mockGetAllCardsUseCase.exec).toHaveBeenCalled()
    expect(mockReply.code).toHaveBeenCalledWith(500)
    expect(mockReply.send).toHaveBeenCalled()
  })
})
