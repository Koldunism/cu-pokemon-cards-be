import { SimulateBattleController } from './simulateBattle.ctrl'
import { AppError, Result, UseCaseError } from '../../../../core'
import { Card } from '../../../../domain/entities'
import { SimulateBattleReq } from './simulateBattle.types'
import { SimulateBattleOutput } from '../../../../application/simulateBattle/simulateBattle.dto'
import { GetCardByIdError } from '../../../../application/getCardById'

const mockGetCardByIdUseCase = {
  exec: jest.fn()
} as any

const mockSimulateBattleUseCase = {
  exec: jest.fn()
} as any

describe('SimulateBattleController', () => {
  let simulateBattleController: SimulateBattleController
  let mockRequest: SimulateBattleReq
  let mockReply: any

  beforeEach(() => {
    simulateBattleController = new SimulateBattleController(mockGetCardByIdUseCase, mockSimulateBattleUseCase)
    mockRequest = {
      query: {
        attackerId: 1,
        defenderId: 2
      }
    } as unknown as SimulateBattleReq
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
    const attacker = {
      id: 1,
      name: 'Attacker',
      type: 'Fire',
      hp: 100,
      attacks: [],
      weakness: 'Water',
      resistance: 'Grass',
      rarity: 'Common',
      expansion: 'Base Set'
    } as Card
    const defender = {
      id: 2,
      name: 'Defender',
      type: 'Water',
      hp: 100,
      attacks: [],
      weakness: 'Grass',
      resistance: 'Fire',
      rarity: 'Common',
      expansion: 'Base Set'
    } as Card
    const simulationResult = { attackerWins: true, attackerDamage: 50, defenderHP: 50 } as SimulateBattleOutput

    mockGetCardByIdUseCase.exec
      .mockResolvedValueOnce(Result.success({ data: attacker }))
      .mockResolvedValueOnce(Result.success({ data: defender }))
    mockSimulateBattleUseCase.exec.mockResolvedValue(Result.success(simulationResult))

    await simulateBattleController.exec(mockRequest, mockReply)

    expect(mockGetCardByIdUseCase.exec).toHaveBeenCalledWith({ id: mockRequest.query.attackerId })
    expect(mockGetCardByIdUseCase.exec).toHaveBeenCalledWith({ id: mockRequest.query.defenderId })
    expect(mockSimulateBattleUseCase.exec).toHaveBeenCalledWith({ attacker, defender })
    expect(mockReply.code).toHaveBeenCalledWith(200)
    expect(mockReply.send).toHaveBeenCalledWith(simulationResult)
  })

  it('should return 404 if attacker card is not found', async () => {
    mockGetCardByIdUseCase.exec.mockResolvedValueOnce(new GetCardByIdError.CardNotFound(1))

    await simulateBattleController.exec(mockRequest, mockReply)

    expect(mockGetCardByIdUseCase.exec).toHaveBeenCalledWith({ id: mockRequest.query.attackerId })
    expect(mockReply.code).toHaveBeenCalledWith(404)
  })

  it('should return 404 if defender card is not found', async () => {
    const attacker = {
      id: 1,
      name: 'Attacker',
      type: 'Fire',
      hp: 100,
      attacks: [],
      weakness: 'Water',
      resistance: 'Grass',
      rarity: 'Common',
      expansion: 'Base Set'
    } as Card

    mockGetCardByIdUseCase.exec
      .mockResolvedValueOnce(Result.success({ data: attacker }))
      .mockResolvedValueOnce(new GetCardByIdError.CardNotFound(2))

    await simulateBattleController.exec(mockRequest, mockReply)

    expect(mockGetCardByIdUseCase.exec).toHaveBeenCalledWith({ id: mockRequest.query.attackerId })
    expect(mockGetCardByIdUseCase.exec).toHaveBeenCalledWith({ id: mockRequest.query.defenderId })
    expect(mockReply.code).toHaveBeenCalledWith(404)
  })

  it('should return 500 if simulation fails', async () => {
    const attacker = {
      id: 1,
      name: 'Attacker',
      type: 'Fire',
      hp: 100,
      attacks: [],
      weakness: 'Water',
      resistance: 'Grass',
      rarity: 'Common',
      expansion: 'Base Set'
    } as Card
    const defender = {
      id: 2,
      name: 'Defender',
      type: 'Water',
      hp: 100,
      attacks: [],
      weakness: 'Grass',
      resistance: 'Fire',
      rarity: 'Common',
      expansion: 'Base Set'
    } as Card

    mockGetCardByIdUseCase.exec
      .mockResolvedValueOnce(Result.success({ data: attacker }))
      .mockResolvedValueOnce(Result.success({ data: defender }))
    mockSimulateBattleUseCase.exec.mockResolvedValue(AppError.UnexpectedError.create('Simulation failed'))

    await simulateBattleController.exec(mockRequest, mockReply)

    expect(mockGetCardByIdUseCase.exec).toHaveBeenCalledWith({ id: mockRequest.query.attackerId })
    expect(mockGetCardByIdUseCase.exec).toHaveBeenCalledWith({ id: mockRequest.query.defenderId })
    expect(mockSimulateBattleUseCase.exec).toHaveBeenCalledWith({ attacker, defender })
    expect(mockReply.code).toHaveBeenCalledWith(500)
  })

  it('should return 500 if UC throws', async () => {
    const unexpectedError = new Error('Unexpected error')

    mockGetCardByIdUseCase.exec.mockRejectedValue(unexpectedError)

    await simulateBattleController.exec(mockRequest, mockReply)

    expect(mockGetCardByIdUseCase.exec).toHaveBeenCalledWith({ id: mockRequest.query.attackerId })
    expect(mockReply.code).toHaveBeenCalledWith(500)
  })
})
