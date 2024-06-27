import { CardRepositoryMapper } from './sequelizeCard.mapper'
import { Attack, Card } from '../../domain/entities'
import AttackModel from '../models/attack.model'
import CardModel from '../models/card.model'

describe('CardRepositoryMapper', () => {
  let cardRepositoryMapper: CardRepositoryMapper

  beforeEach(() => {
    cardRepositoryMapper = new CardRepositoryMapper()
  })

  it('should map CardModel to Card correctly', () => {
    const attackModels = [
      {
        id: 1,
        cardId: 1,
        name: 'Thunder Shock',
        power: 40
      } as AttackModel,
      {
        id: 2,
        cardId: 1,
        name: 'Electro Ball',
        power: 50
      } as AttackModel
    ]

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
        attacks: attackModels
      }
    } as unknown as CardModel

    const card = cardRepositoryMapper.cardModelToCard(cardModel)

    expect(card).toBeInstanceOf(Card)
    expect(card.id).toBe(cardModel.id)
    expect(card.name).toBe(cardModel.name)
    expect(card.type).toBe(cardModel.type)
    expect(card.hp).toBe(cardModel.hp)
    expect(card.rarity).toBe(cardModel.rarity)
    expect(card.expansion).toBe(cardModel.expansion)
    expect(card.weakness).toBe(cardModel.weakness)
    expect(card.resistance).toBe(cardModel.resistance)
    expect(card.defense).toBe(cardModel.defense)
    expect(card.attacks).toHaveLength(2)
    expect(card.attacks[0].name).toBe(attackModels[0].name)
    expect(card.attacks[0].power).toBe(attackModels[0].power)
    expect(card.attacks[1].name).toBe(attackModels[1].name)
    expect(card.attacks[1].power).toBe(attackModels[1].power)
  })

  it('should map attacksModel to attacks correctly', () => {
    const attackModels = [
      {
        id: 1,
        cardId: 1,
        name: 'Thunder Shock',
        power: 40
      } as AttackModel,
      {
        id: 2,
        cardId: 1,
        name: 'Electro Ball',
        power: 50
      } as AttackModel
    ]

    const attacks = cardRepositoryMapper.attacksModelToAttacks(attackModels)

    expect(attacks).toHaveLength(2)
    expect(attacks[0]).toBeInstanceOf(Attack)
    expect(attacks[0].id).toBe(attackModels[0].id)
    expect(attacks[0].name).toBe(attackModels[0].name)
    expect(attacks[0].power).toBe(attackModels[0].power)
    expect(attacks[1]).toBeInstanceOf(Attack)
    expect(attacks[1].id).toBe(attackModels[1].id)
    expect(attacks[1].name).toBe(attackModels[1].name)
    expect(attacks[1].power).toBe(attackModels[1].power)
  })
})
