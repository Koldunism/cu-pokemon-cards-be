import { CardRepositoryMapper } from './sequelizeCard.mapper'
import { SequelizeCardRepository } from './sequelizeCard.repo'
import { SequelizeUserRepository } from './sequelizeUser.repo'

const cardRepositoryMapper = new CardRepositoryMapper()
const sequelizeCardRepository = new SequelizeCardRepository(cardRepositoryMapper)

const sequelizeUserRepository = new SequelizeUserRepository()

export { sequelizeCardRepository, sequelizeUserRepository }
