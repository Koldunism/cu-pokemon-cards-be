import { Model, DataTypes } from 'sequelize'
import sequelize from '../database'
import AttackModel from './attack.model'

class CardModel extends Model {
  public id!: number
  public name!: string
  public type!: string
  public hp!: number
  public weakness!: string
  public resistance!: string
  public attacks: AttackModel[] = []
  public rarity!: string
  public expansion!: string
}

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
      allowNull: false
    },
    resistance: {
      type: new DataTypes.STRING(128),
      allowNull: false
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

export default CardModel
