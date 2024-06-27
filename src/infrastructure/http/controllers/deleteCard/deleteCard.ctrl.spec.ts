import { DeleteCardController, DeleteCardReq } from '.'
import { DeleteCardError } from '../../../../application/deleteCard'
import { AppError, Result } from '../../../../core'

const mockDeleteCardUseCase = {
  exec: jest.fn()
} as any

describe('DeleteCardController', () => {
  let deleteCardController: DeleteCardController
  let mockRequest: DeleteCardReq
  let mockReply: any

  beforeEach(() => {
    deleteCardController = new DeleteCardController(mockDeleteCardUseCase)
    mockRequest = {
      params: {
        id: 1
      }
    } as DeleteCardReq
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
    mockDeleteCardUseCase.exec.mockResolvedValue(Result.success({ success: true }))

    await deleteCardController.exec(mockRequest, mockReply)

    expect(mockDeleteCardUseCase.exec).toHaveBeenCalledWith(mockRequest.params)
    expect(mockReply.code).toHaveBeenCalledWith(200)
    expect(mockReply.send).toHaveBeenCalled()
  })

  it('should return 204 if card is not found', async () => {
    const errorResult = new DeleteCardError.CardDeletionFailed()

    mockDeleteCardUseCase.exec.mockResolvedValue(errorResult)

    await deleteCardController.exec(mockRequest, mockReply)

    expect(mockDeleteCardUseCase.exec).toHaveBeenCalledWith(mockRequest.params)
    expect(mockReply.code).toHaveBeenCalledWith(204)
    expect(mockReply.send).toHaveBeenCalled()
  })

  it('should return 500 if UC returns unexpected error', async () => {
    const unexpectedError = AppError.UnexpectedError.create('some error')

    mockDeleteCardUseCase.exec.mockReturnValue(unexpectedError)

    await deleteCardController.exec(mockRequest, mockReply)

    expect(mockDeleteCardUseCase.exec).toHaveBeenCalledWith(mockRequest.params)
    expect(mockReply.code).toHaveBeenCalledWith(500)
    expect(mockReply.send).toHaveBeenCalled()
  })
  it('should return 500 if UC throws', async () => {
    const unexpectedError = new Error('Unexpected error')

    mockDeleteCardUseCase.exec.mockRejectedValue(unexpectedError)

    await deleteCardController.exec(mockRequest, mockReply)

    expect(mockDeleteCardUseCase.exec).toHaveBeenCalledWith(mockRequest.params)
    expect(mockReply.code).toHaveBeenCalledWith(500)
    expect(mockReply.send).toHaveBeenCalled()
  })
})
