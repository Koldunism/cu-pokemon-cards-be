import { Attack, Card } from '../../domain/entities'
import AttackModel from '../models/attack.model'
import CardModel from '../models/card.model'

export class CardRepositoryMapper {
  cardModelToCard(cardModel: CardModel): Card {
    const attacksModel = cardModel.dataValues.attacks as [AttackModel]

    const attacks = this.attacksModelToAttacks(attacksModel)

    const card = new Card(cardModel)
    card.attacks = attacks

    return card
  }

  attacksModelToAttacks(attacksModel: Array<AttackModel>): Array<Attack> {
    return attacksModel.map((attack) => new Attack(attack))
  }
}
