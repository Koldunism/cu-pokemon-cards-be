import { SequelizeUserRepository } from './sequelizeUser.repo'
import UserModel, { initUserModel } from '../models/user.model'
import sequelize from '../database'

jest.mock('../models/user.model')
jest.mock('../database')

describe('SequelizeUserRepo', () => {
  let repository: SequelizeUserRepository

  beforeAll(() => {
    initUserModel(sequelize)
  })

  beforeEach(() => {
    repository = new SequelizeUserRepository()
    jest.clearAllMocks()
  })

  it('should get card by id', async () => {
    const userModel = {
      id: 1,
      username: 'user',
      passwordHash: 1234
    }

    UserModel.findOne = jest.fn().mockResolvedValue(userModel)

    const result = await repository.findByUsername('user')

    expect(result).toEqual(userModel)
    expect(UserModel.findOne).toHaveBeenCalled()
  })

  it('should return null if card by id not found', async () => {
    UserModel.findOne = jest.fn().mockResolvedValue(null)

    const result = await repository.findByUsername('user')

    expect(result).toBeNull()
    expect(UserModel.findOne).toHaveBeenCalled()
  })
})
