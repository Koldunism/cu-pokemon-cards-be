import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class AttackModel extends Model {
  public id!: number;
  public cardId!: number;
  public name!: string;
  public power!: number;
}

AttackModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    cardId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    power: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "attacks",
    sequelize,
  }
);

export default AttackModel;
