import { DataTypes, Sequelize } from 'sequelize'
import AttackModel, { initAttackModel } from './attack.model'

describe('AttackModel', () => {
  const sequelizeInstance = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false
  })

  beforeAll(async () => {
    initAttackModel(sequelizeInstance)
    await sequelizeInstance.sync({ force: true })
  })

  afterAll(async () => {
    await sequelizeInstance.close()
  })

  it('should create an instance of AttackModel with valid properties', async () => {
    const attack = await AttackModel.create({
      cardId: 1,
      name: 'Thunder Shock',
      power: 40
    })

    expect(attack).toBeInstanceOf(AttackModel)
    expect(attack.id).toBeDefined()
    expect(attack.cardId).toBe(1)
    expect(attack.name).toBe('Thunder Shock')
    expect(attack.power).toBe(40)
  })

  it('should not create an instance of AttackModel without cardId', async () => {
    await expect(
      AttackModel.create({
        name: 'Thunder Shock',
        power: 40
      })
    ).rejects.toThrow()
  })

  it('should not create an instance of AttackModel without name', async () => {
    await expect(
      AttackModel.create({
        cardId: 1,
        power: 40
      })
    ).rejects.toThrow()
  })

  it('should not create an instance of AttackModel without power', async () => {
    await expect(
      AttackModel.create({
        cardId: 1,
        name: 'Thunder Shock'
      })
    ).rejects.toThrow()
  })
})
