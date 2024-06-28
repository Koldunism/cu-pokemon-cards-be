import { Model, DataTypes, Sequelize } from 'sequelize'

class UserModel extends Model {
  public id!: number
  public username!: string
  public passwordHash!: string
}

export const initUserModel = (sequelize: Sequelize) => {
  UserModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true
      },
      passwordHash: {
        type: new DataTypes.STRING(256),
        allowNull: false
      }
    },
    {
      tableName: 'users',
      sequelize
    }
  )
}

export default UserModel
