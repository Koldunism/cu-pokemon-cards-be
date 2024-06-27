import { CardRepositoryMapper } from './sequelizeCard.mapper'
import { SequelizeCardRepository } from './sequelizeCard.repo'

const cardRepositoryMapper = new CardRepositoryMapper()
const sequelizeCardRepository = new SequelizeCardRepository(cardRepositoryMapper)

export default sequelizeCardRepository
