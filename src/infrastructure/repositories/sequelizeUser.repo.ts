import sequelize from '../database'
import { UserRepository } from '../../domain/repositories/user.repo'
import UserModel, { initUserModel } from '../models/user.model'
import { User } from '../../domain/entities'

export class SequelizeUserRepository implements UserRepository {
  constructor() {
    initUserModel(sequelize)
  }

  async findByUsername(username: string): Promise<User | null> {
    const result = await UserModel.findOne({ where: { username } })
    if (!result) {
      return null
    }

    return new User(result)
  }
}
