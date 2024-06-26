import 'source-map-support/register'
import sequelize from './infrastructure/database'
;(async () => {
  await sequelize.authenticate()
  console.log('DB [pokemon_cards]: ✅ Connection established successfully')

  await import('./infrastructure/models')
  await sequelize.sync()
  console.log('DB [pokemon_cards]: ✅ Models synchronized successfully')

  await import('./infrastructure/http/index')
  console.log('App [cu-pokemon-cards-be]: ✅ Initiated successfully')
})()
