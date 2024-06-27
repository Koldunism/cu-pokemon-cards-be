import { Card } from '../../domain/entities'
import { CardRepository, DataLimiters } from '../../domain/repositories/card.repo'
import CardModel, { initCardModel } from '../models/card.model'
import AttackModel, { initAttackModel } from '../models/attack.model'
import sequelize from '../database'
import { Paginated } from '../../core/PaginateQuery'
import { CardRepositoryMapper } from './sequelizeCard.mapper'

export class SequelizeCardRepository implements CardRepository {
  public readonly cardRepositoryMapper: CardRepositoryMapper

  constructor(cardRepositoryMapper: CardRepositoryMapper) {
    this.cardRepositoryMapper = cardRepositoryMapper
    initAttackModel(sequelize)
    initCardModel(sequelize)
  }

  async createCard(card: Card): Promise<Card | null> {
    const { attacks, ...cardData } = card
    const transaction = await sequelize.transaction()

    try {
      const cardModel = await CardModel.create(
        {
          ...cardData,
          attacks: attacks.map(({ name, power }) => ({ name, power }))
        },
        {
          include: [{ model: AttackModel, as: 'attacks' }],
          transaction
        }
      )
      await transaction.commit()

      return this.cardRepositoryMapper.cardModelToCard(cardModel)
    } catch (error: any) {
      await transaction.rollback()
      console.error('Error at createCard DB method: ', JSON.stringify(error))
      return null
    }
  }

  async getAllCardsPaginated(dataLimiters: DataLimiters, filters?: any): Promise<Paginated<Card> | null> {
    const { limit, offset, sortBy, order } = dataLimiters

    const transaction = await sequelize.transaction()

    try {
      const whereClause: any = {}

      if (filters) {
        Object.keys(filters).forEach((key) => {
          if (filters[key] !== undefined) {
            whereClause[key] = filters[key]
          }
        })
      }

      const { rows, count } = await CardModel.findAndCountAll({
        include: [{ model: AttackModel, as: 'attacks' }],
        where: whereClause,
        distinct: true,
        transaction,
        limit,
        offset,
        order: [[sortBy, order]]
      })
      await transaction.commit()

      return {
        data: rows.map((cardModel) => this.cardRepositoryMapper.cardModelToCard(cardModel)),
        offset,
        limit,
        hasNext: offset + rows.length < count,
        total: count
      }
    } catch (error) {
      await transaction.rollback()
      console.error('Error at getAllCardsPaginated DB method: ', JSON.stringify(error))
      return null
    }
  }

  async getCardById(id: number): Promise<Card | null> {
    const transaction = await sequelize.transaction()
    try {
      const cardModel = await CardModel.findByPk(id, { include: [{ model: AttackModel, as: 'attacks' }], transaction })
      await transaction.commit()
      if (!cardModel) {
        return null
      }

      return this.cardRepositoryMapper.cardModelToCard(cardModel)
    } catch (error) {
      await transaction.rollback()
      console.error('Error at getAllCardsPaginated DB method: ', JSON.stringify(error))
      throw new Error('DB Error, check logs.')
    }
  }

  async updateCard(card: Partial<Card>): Promise<boolean> {
    const transaction = await sequelize.transaction()
    const { id } = card

    try {
      await CardModel.update(
        {
          ...(card.name && { name: card.name }),
          ...(card.type && { name: card.type }),
          ...(card.hp && { name: card.hp }),
          ...(card.weakness && { name: card.weakness }),
          ...(card.resistance && { name: card.resistance }),
          ...(card.defense && { name: card.defense }),
          ...(card.rarity && { name: card.rarity }),
          ...(card.expansion && { name: card.expansion })
        },
        {
          where: { id },
          transaction
        }
      )

      if (card.attacks) {
        await AttackModel.destroy({
          where: { cardId: id },
          transaction
        })

        const attacks = card.attacks.map((attack) => ({
          ...attack,
          cardId: id
        }))

        await AttackModel.bulkCreate(attacks, { transaction })
      }

      transaction.commit()

      return true
    } catch (error) {
      await transaction.rollback()
      console.error('Error at getAllCardsPaginated DB method: ', JSON.stringify(error))
      return false
    }
  }

  async deleteCard(id: number): Promise<boolean> {
    const transaction = await sequelize.transaction()

    try {
      await AttackModel.destroy({
        where: { cardId: id },
        transaction
      })
      await CardModel.destroy({
        where: { id },
        transaction
      })

      transaction.commit()

      return true
    } catch (error) {
      await transaction.rollback()
      console.error('Error at deleteCard DB method: ', JSON.stringify(error))
      return false
    }
  }

  async getCardsByType(type: string): Promise<Card[]> {
    const cardModels = await CardModel.findAll({
      where: { type },
      include: [{ model: AttackModel, as: 'attacks' }]
    })

    return cardModels.map((cardModel) => this.cardRepositoryMapper.cardModelToCard(cardModel))
  }
}
