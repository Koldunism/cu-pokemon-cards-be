import { DataTypes, Sequelize } from 'sequelize'
import CardModel, { initCardModel } from './card.model'
import AttackModel, { initAttackModel } from './attack.model'

describe('CardModel', () => {
  const sequelizeInstance = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false
  })

  beforeAll(async () => {
    initAttackModel(sequelizeInstance)
    initCardModel(sequelizeInstance)
    await sequelizeInstance.sync({ force: true })
  })

  afterAll(async () => {
    await sequelizeInstance.close()
  })

  it('should create an instance of CardModel with valid properties', async () => {
    const card = await CardModel.create({
      name: 'Pikachu',
      type: 'Electric',
      hp: 35,
      rarity: 'Common',
      expansion: 'Base Set'
    })

    expect(card).toBeInstanceOf(CardModel)
    expect(card.id).toBeDefined()
    expect(card.name).toBe('Pikachu')
    expect(card.type).toBe('Electric')
    expect(card.hp).toBe(35)
    expect(card.rarity).toBe('Common')
    expect(card.expansion).toBe('Base Set')
  })

  it('should create an instance of CardModel with optional properties', async () => {
    const card = await CardModel.create({
      name: 'Charizard',
      type: 'Fire',
      hp: 120,
      rarity: 'Rare',
      expansion: 'Base Set',
      weakness: 'Water',
      resistance: 'Grass',
      defense: 70
    })

    expect(card).toBeInstanceOf(CardModel)
    expect(card.weakness).toBe('Water')
    expect(card.resistance).toBe('Grass')
    expect(card.defense).toBe(70)
  })

  it('should not create an instance of CardModel without required properties', async () => {
    await expect(
      CardModel.create({
        type: 'Electric',
        hp: 35,
        rarity: 'Common',
        expansion: 'Base Set'
      })
    ).rejects.toThrow()

    await expect(
      CardModel.create({
        name: 'Pikachu',
        hp: 35,
        rarity: 'Common',
        expansion: 'Base Set'
      })
    ).rejects.toThrow()

    await expect(
      CardModel.create({
        name: 'Pikachu',
        type: 'Electric',
        rarity: 'Common',
        expansion: 'Base Set'
      })
    ).rejects.toThrow()

    await expect(
      CardModel.create({
        name: 'Pikachu',
        type: 'Electric',
        hp: 35,
        expansion: 'Base Set'
      })
    ).rejects.toThrow()
  })

  it('should create a CardModel instance with associated AttackModel instances', async () => {
    const card = await CardModel.create(
      {
        name: 'Pikachu',
        type: 'Electric',
        hp: 35,
        rarity: 'Common',
        expansion: 'Base Set',
        attacks: [
          { name: 'Thunder Shock', power: 40 },
          { name: 'Quick Attack', power: 30 }
        ]
      },
      {
        include: [{ model: AttackModel, as: 'attacks' }]
      }
    )

    const attacks = card.dataValues.attacks
    expect(attacks).toHaveLength(2)
    expect(attacks[0].name).toBe('Thunder Shock')
    expect(attacks[1].name).toBe('Quick Attack')
  })
})
