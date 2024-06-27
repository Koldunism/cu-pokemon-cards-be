import { Card } from '../../domain/entities'
import { CardRepository } from '../../domain/repositories/card.repo'
import CardModel from '../models/card.model'
import AttackModel from '../models/attack.model'
import sequelize from '../database'
import { Paginated, PaginatedQueryParams } from '../../core/PaginateQuery'
import { SortQueryParams } from '../../core'

//TODO: trycatch blocks
//TODO: transaction methods with multi calls

export class SequelizeCardRepository implements CardRepository {
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

      const attacksModel = cardModel.dataValues.attacks as [AttackModel]

      return new Card({
        ...cardModel.dataValues,
        attacks: attacksModel.map(({ name, power }) => ({ name, power }))
      })
    } catch (error: any) {
      await transaction.rollback()
      console.error('Error at createCard DB method: ', JSON.stringify(error))
      return null
    }
  }

  async getAllCardsPaginated(filter: PaginatedQueryParams & SortQueryParams): Promise<Paginated<Card> | null> {
    const { limit, offset, sortBy, order } = filter
    const transaction = await sequelize.transaction()

    try {
      const { rows, count } = await CardModel.findAndCountAll({
        include: [{ model: AttackModel, as: 'attacks' }],
        distinct: true,
        transaction,
        limit,
        offset,
        order: [[sortBy, order]]
      })
      await transaction.commit()

      const data = rows.map((cardModel) => new Card({ ...cardModel.dataValues }))

      return {
        data,
        offset,
        limit,
        hasNext: offset + data.length < count,
        total: count
      }
    } catch (error) {
      await transaction.rollback()
      console.error('Error at getAllCardsPaginated DB method: ', JSON.stringify(error))
      return null
    }
  }

  async getCardById(id: number): Promise<Card | null> {
    const cardModel = await CardModel.findByPk(id, { include: [AttackModel] })
    if (!cardModel) {
      return null
    }
    return new Card({ ...cardModel })
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

  async deleteCard(id: number): Promise<void> {
    await AttackModel.destroy({
      where: { cardId: id }
    })
    await CardModel.destroy({
      where: { id }
    })
  }
}
