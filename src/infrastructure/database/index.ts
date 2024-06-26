import { Sequelize } from "sequelize";
import { DBCONFIG } from "../../config";

const sequelize = new Sequelize({
  dialect: DBCONFIG.dialect,
  host: DBCONFIG.host,
  username: DBCONFIG.username,
  password: DBCONFIG.password,
  database: DBCONFIG.database,
  logging: false,
});

export default sequelize;
