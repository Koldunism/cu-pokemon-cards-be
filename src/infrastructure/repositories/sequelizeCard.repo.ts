import { Card, Attack } from '../../domain/entities'
import { CardRepository } from '../../domain/repositories/card.repo'
import CardModel from '../models/card.model'
import AttackModel from '../models/attack.model'
import sequelize from '../database'

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
          include: [{ model: AttackModel, as: 'attacks' }]
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

  async getAllCards(): Promise<Card[]> {
    const cardModels = await CardModel.findAll({ include: [AttackModel] })
    return cardModels.map((cardModel) => new Card({ ...cardModel }))
  }

  async getCardById(id: number): Promise<Card | null> {
    const cardModel = await CardModel.findByPk(id, { include: [AttackModel] })
    if (!cardModel) {
      return null
    }
    return new Card({ ...cardModel })
  }

  async updateCard(id: number, card: Card): Promise<void> {
    const transaction = sequelize.transaction() //TODO transaction example.

    await CardModel.update(
      {
        name: card.name,
        type: card.type,
        hp: card.hp,
        weakness: card.weakness,
        resistance: card.resistance,
        rarity: card.rarity,
        expansion: card.expansion
      },
      {
        where: { id }
      }
    )

    await AttackModel.destroy({
      where: { cardId: id }
    })

    const attacks = card.attacks.map((attack) => ({
      ...attack,
      cardId: id
    }))

    await AttackModel.bulkCreate(attacks)
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
