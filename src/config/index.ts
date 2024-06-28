import 'dotenv/config'
import { Dialect } from 'sequelize'

export const DBCONFIG = {
  host: process.env.DB_HOST || '127.0.0.1',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'EB&Tn4Vr!',
  database: process.env.DB_NAME || 'pokemon_cards',
  dialect: (process.env.DB_DIALECT as Dialect) || 'postgres'
}

export const FASTIFYCONFIG = {
  ajv: {
    customOptions: {
      coerceTypes: true,
      removeAdditional: true,
      useDefaults: true,
      allErrors: true
    }
  },
  logger: false
}

export const SERVERCONFIG = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0'
}

export const ROUTES_WITHOUT_AUTHENTICATION = ['/health', '/login']
