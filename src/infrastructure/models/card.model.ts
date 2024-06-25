import { Model, DataTypes } from "sequelize";
import sequelize from "../database";
import AttackModel from "./attack.model";

class CardModel extends Model {
  public id!: number;
  public name!: string;
  public type!: string;
  public hp!: number;
  public defense!: number;
  public weakness!: string;
  public resistance!: string;
  public rarity!: string;
  public attacks: AttackModel[] = [];
}

CardModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    type: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    hp: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    weakness: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    resistance: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    rarity: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "cards",
    sequelize,
  }
);

CardModel.hasMany(AttackModel, {
  sourceKey: "id",
  foreignKey: "cardId",
  as: "attacks",
  onDelete: "CASCADE",
});

AttackModel.belongsTo(CardModel, {
  targetKey: "id",
  foreignKey: "cardId",
  as: "card",
});

export default CardModel;
