import { Model, DataTypes, Sequelize } from 'sequelize'
import AttackModel from './attack.model'

class CardModel extends Model {
  public id!: number
  public name!: string
  public type!: string
  public hp!: number
  public weakness!: string
  public resistance!: string
  public defense!: number
  public attacks: AttackModel[] = []
  public rarity!: string
  public expansion!: string
}

export const initCardModel = (sequelize: Sequelize) => {
  CardModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
      type: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      weakness: {
        type: new DataTypes.STRING(128),
        allowNull: true
      },
      resistance: {
        type: new DataTypes.STRING(128),
        allowNull: true
      },
      defense: {
        type: new DataTypes.INTEGER(),
        allowNull: true
      },
      rarity: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
      expansion: {
        type: new DataTypes.STRING(128),
        allowNull: false
      }
    },
    {
      tableName: 'cards',
      sequelize
    }
  )

  CardModel.hasMany(AttackModel, {
    sourceKey: 'id',
    foreignKey: 'cardId',
    as: 'attacks',
    onDelete: 'CASCADE'
  })

  AttackModel.belongsTo(CardModel, {
    targetKey: 'id',
    foreignKey: 'cardId',
    as: 'card'
  })
}

export default CardModel
