import { Dialect } from "sequelize";

export const DBCONFIG = {
  host: process.env.DB_HOST || "127.0.0.1",
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "EB&Tn4Vr!",
  database: process.env.DB_NAME || "pokemon_cards",
  dialect: (process.env.DB_DIALECT as Dialect) || "postgres",
};
