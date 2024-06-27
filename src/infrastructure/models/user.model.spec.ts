import { Sequelize } from 'sequelize'
import UserModel, { initUserModel } from './user.model'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false
})

describe('UserModel', () => {
  beforeAll(async () => {
    initUserModel(sequelize)
    await sequelize.sync()
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a user with valid properties', async () => {
    const user = await UserModel.create({
      username: 'testuser',
      passwordHash: 'hashedpassword123'
    })

    expect(user).toBeDefined()
    expect(user.id).toBeDefined()
    expect(user.username).toBe('testuser')
    expect(user.passwordHash).toBe('hashedpassword123')
  })

  it('should not create a user with duplicate username', async () => {
    await UserModel.create({
      username: 'uniqueuser',
      passwordHash: 'hashedpassword123'
    })

    await expect(
      UserModel.create({
        username: 'uniqueuser',
        passwordHash: 'hashedpassword456'
      })
    ).rejects.toThrow()
  })

  it('should not create a user with null username', async () => {
    await expect(
      UserModel.create({
        username: null,
        passwordHash: 'hashedpassword123'
      })
    ).rejects.toThrow()
  })

  it('should not create a user with null passwordHash', async () => {
    await expect(
      UserModel.create({
        username: 'testuser2',
        passwordHash: null
      })
    ).rejects.toThrow()
  })
})
