import { SequelizeCardRepository } from './sequelizeCard.repo'
import { Attack } from '../../domain/entities'
import CardModel, { initCardModel } from '../models/card.model'
import AttackModel, { initAttackModel } from '../models/attack.model'
import sequelize from '../database'

jest.mock('../models/card.model')
jest.mock('../models/attack.model')
jest.mock('../database')

const mockCardRepositoryMapper = {
  cardModelToCard: jest.fn(),
  attacksModelToAttacks: jest.fn()
}

describe('SequelizeCardRepository', () => {
  let repository: SequelizeCardRepository

  beforeAll(() => {
    // Mock the Sequelize init method for the models
    initCardModel(sequelize)
    initAttackModel(sequelize)
  })

  beforeEach(() => {
    repository = new SequelizeCardRepository(mockCardRepositoryMapper)
    jest.clearAllMocks()
    ;(sequelize.transaction as jest.Mock).mockImplementation(async (callback = jest.fn()) => {
      const transaction = {
        commit: jest.fn(),
        rollback: jest.fn()
      }
      await callback(transaction)
      return transaction
    })
  })

  it('should create a card successfully', async () => {
    const cardData = {
      name: 'Pikachu',
      type: 'Electric',
      hp: 60,
      rarity: 'Common',
      expansion: 'Base Set',
      attacks: [new Attack({ name: 'Thunder Shock', power: 40 })],
      weakness: 'Ground',
      resistance: 'Flying'
    }

    const cardModel = {
      ...cardData,
      dataValues: {
        attacks: [{ id: 1, cardId: 1, name: 'Thunder Shock', power: 40 }]
      }
    }

    CardModel.create = jest.fn().mockResolvedValue(cardModel)
    mockCardRepositoryMapper.cardModelToCard.mockReturnValue(cardData)

    const result = await repository.createCard(cardData)

    expect(result).toEqual(cardData)
    expect(CardModel.create).toHaveBeenCalled()
  })

  it('should handle error when creating a card', async () => {
    const cardData = {
      name: 'Pikachu',
      type: 'Electric',
      hp: 60,
      rarity: 'Common',
      expansion: 'Base Set',
      attacks: [new Attack({ name: 'Thunder Shock', power: 40 })],
      weakness: 'Ground',
      resistance: 'Flying'
    }

    CardModel.create = jest.fn().mockRejectedValue(new Error('Failed to create card'))

    const result = await repository.createCard(cardData)

    expect(result).toBeNull()
    expect(CardModel.create).toHaveBeenCalled()
  })

  it('should get all cards paginated', async () => {
    const dataLimiters = { limit: 10, offset: 0, sortBy: 'name', order: 'ASC' }
    const cardModels = [
      {
        id: 1,
        name: 'Pikachu',
        type: 'Electric',
        hp: 60,
        rarity: 'Common',
        expansion: 'Base Set',
        weakness: 'Ground',
        resistance: 'Flying',
        defense: 10,
        dataValues: {
          attacks: [{ id: 1, cardId: 1, name: 'Thunder Shock', power: 40 }]
        }
      }
    ]
    const filters = { type: 'Electric' }

    CardModel.findAndCountAll = jest.fn().mockResolvedValue({ rows: cardModels, count: 1 })
    mockCardRepositoryMapper.cardModelToCard.mockImplementation((model) => model)

    const result = await repository.getAllCardsPaginated(dataLimiters, filters)

    expect(result).toEqual({
      data: cardModels,
      offset: 0,
      limit: 10,
      hasNext: false,
      total: 1
    })
    expect(CardModel.findAndCountAll).toHaveBeenCalled()
  })

  it('should handle error when getting all cards paginated', async () => {
    const dataLimiters = { limit: 10, offset: 0, sortBy: 'name', order: 'ASC' }
    const filters = {}

    CardModel.findAndCountAll = jest.fn().mockRejectedValue(new Error('Failed to get cards'))

    const result = await repository.getAllCardsPaginated(dataLimiters, filters)

    expect(result).toBeNull()
    expect(CardModel.findAndCountAll).toHaveBeenCalled()
  })

  it('should get card by id', async () => {
    const cardModel = {
      id: 1,
      name: 'Pikachu',
      type: 'Electric',
      hp: 60,
      rarity: 'Common',
      expansion: 'Base Set',
      weakness: 'Ground',
      resistance: 'Flying',
      defense: 10,
      dataValues: {
        attacks: [{ id: 1, cardId: 1, name: 'Thunder Shock', power: 40 }]
      }
    }

    CardModel.findByPk = jest.fn().mockResolvedValue(cardModel)
    mockCardRepositoryMapper.cardModelToCard.mockReturnValue(cardModel)

    const result = await repository.getCardById(1)

    expect(result).toEqual(cardModel)
    expect(CardModel.findByPk).toHaveBeenCalled()
  })

  it('should return null if card by id not found', async () => {
    CardModel.findByPk = jest.fn().mockResolvedValue(null)

    const result = await repository.getCardById(1)

    expect(result).toBeNull()
    expect(CardModel.findByPk).toHaveBeenCalled()
  })
  it('should return null if card by id not found', async () => {
    CardModel.findByPk = jest.fn().mockResolvedValue(null)

    const result = await repository.getCardById(1)

    expect(result).toBeNull()
    expect(CardModel.findByPk).toHaveBeenCalled()
  })

  it('should handle error when getting card by id', async () => {
    const id = 1
    const errorMessage = 'DB Error'

    CardModel.findByPk = jest.fn().mockRejectedValue(new Error(errorMessage))

    await expect(repository.getCardById(id)).rejects.toThrow('DB Error, check logs.')
    expect(CardModel.findByPk).toHaveBeenCalled()
  })

  it('should update a card successfully', async () => {
    const cardData = {
      id: 1,
      name: 'Pikachu',
      type: 'Electric',
      hp: 60,
      rarity: 'Common',
      expansion: 'Base Set',
      attacks: [new Attack({ name: 'Thunder Shock', power: 40 })],
      weakness: 'Ground',
      resistance: 'Flying',
      defense: 10
    }

    CardModel.update = jest.fn().mockResolvedValue([1])
    AttackModel.destroy = jest.fn().mockResolvedValue(1)
    AttackModel.bulkCreate = jest.fn().mockResolvedValue([])

    await repository.updateCard(cardData)

    expect(CardModel.update).toHaveBeenCalled()
    expect(AttackModel.destroy).toHaveBeenCalled()
    expect(AttackModel.bulkCreate).toHaveBeenCalled()
  })

  it('should handle error when updating a card', async () => {
    const cardData = {
      id: 1,
      name: 'Pikachu',
      type: 'Electric',
      hp: 60,
      rarity: 'Common',
      expansion: 'Base Set',
      attacks: [new Attack({ name: 'Thunder Shock', power: 40 })],
      weakness: 'Ground',
      resistance: 'Flying',
      defense: 10
    }

    CardModel.update = jest.fn().mockRejectedValue(new Error('Failed to update card'))

    await repository.updateCard(cardData)

    expect(CardModel.update).toHaveBeenCalled()
    expect(AttackModel.destroy).toHaveBeenCalledTimes(0)
    expect(AttackModel.bulkCreate).toHaveBeenCalledTimes(0)
  })

  it('should delete a card successfully', async () => {
    CardModel.destroy = jest.fn().mockResolvedValue(1)
    AttackModel.destroy = jest.fn().mockResolvedValue(1)

    await repository.deleteCard(1)

    expect(CardModel.destroy).toHaveBeenCalled()
    expect(AttackModel.destroy).toHaveBeenCalled()
  })

  it('should handle error when deleting a card', async () => {
    CardModel.destroy = jest.fn().mockRejectedValue(new Error('Failed to delete card'))

    await repository.deleteCard(1)

    expect(CardModel.destroy).toHaveBeenCalled()
  })

  it('should get cards by type successfully', async () => {
    const cardModels = [
      {
        id: 1,
        name: 'Pikachu',
        type: 'Electric',
        hp: 60,
        rarity: 'Common',
        expansion: 'Base Set',
        weakness: 'Ground',
        resistance: 'Flying',
        defense: 10,
        dataValues: {
          attacks: [{ id: 1, cardId: 1, name: 'Thunder Shock', power: 40 }]
        }
      },
      {
        id: 2,
        name: 'Raichu',
        type: 'Electric',
        hp: 80,
        rarity: 'Uncommon',
        expansion: 'Base Set',
        weakness: 'Ground',
        resistance: 'Flying',
        defense: 20,
        dataValues: {
          attacks: [{ id: 2, cardId: 2, name: 'Thunder Punch', power: 50 }]
        }
      }
    ]

    const type = 'Electric'

    CardModel.findAll = jest.fn().mockResolvedValue(cardModels)
    mockCardRepositoryMapper.cardModelToCard.mockImplementation((model) => model)

    const result = await repository.getCardsByType(type)

    expect(result).toEqual(cardModels)
    expect(CardModel.findAll).toHaveBeenCalled()
  })
})
