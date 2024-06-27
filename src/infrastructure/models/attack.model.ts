import { Model, DataTypes, Sequelize } from 'sequelize'

class AttackModel extends Model {
  public id!: number
  public cardId!: number
  public name!: string
  public power!: number
}

export const initAttackModel = (sequelize: Sequelize) => {
  AttackModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      cardId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
      power: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: 'attacks',
      sequelize
    }
  )
}

export default AttackModel
