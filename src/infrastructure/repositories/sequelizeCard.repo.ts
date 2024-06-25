import { Card, Attack } from "../../domain/entities";
import { CardRepository } from "../../domain/repositories/card.repo";
import CardModel from "../models/card.model";
import AttackModel from "../models/attack.model";

export class SequelizeCardRepository implements CardRepository {
  async createCard(card: Card): Promise<void> {
    const cardModel = await CardModel.create(
      {
        name: card.name,
        type: card.type,
        hp: card.hp,
        weakness: card.weakness,
        resistance: card.resistance,
        attacks: card.attacks.map((attack) => ({
          name: attack.name,
          power: attack.power,
        })),
      },
      {
        include: [AttackModel],
      }
    );
  }

  async getAllCards(): Promise<Card[]> {
    const cardModels = await CardModel.findAll({ include: [AttackModel] });
    return cardModels.map(
      (cardModel) =>
        new Card(
          cardModel.id,
          cardModel.name,
          cardModel.type,
          cardModel.hp,
          cardModel.defense,
          cardModel.weakness,
          cardModel.resistance,
          cardModel.attacks
            ? cardModel.attacks.map(
                (attack) => new Attack(attack.name, attack.power)
              )
            : []
        )
    );
  }

  async getCardById(id: number): Promise<Card | null> {
    const cardModel = await CardModel.findByPk(id, { include: [AttackModel] });
    if (!cardModel) {
      return null;
    }
    return new Card(
      cardModel.id,
      cardModel.name,
      cardModel.type,
      cardModel.hp,
      cardModel.defense,
      cardModel.weakness,
      cardModel.resistance,
      cardModel.attacks
        ? cardModel.attacks.map(
            (attack) => new Attack(attack.name, attack.power)
          )
        : []
    );
  }

  async updateCard(id: number, card: Card): Promise<void> {
    await CardModel.update(
      {
        name: card.name,
        type: card.type,
        hp: card.hp,
        weakness: card.weakness,
        resistance: card.resistance,
      },
      {
        where: { id },
      }
    );

    await AttackModel.destroy({
      where: { cardId: id },
    });

    const attacks = card.attacks.map((attack) => ({
      ...attack,
      cardId: id,
    }));

    await AttackModel.bulkCreate(attacks);
  }

  async deleteCard(id: number): Promise<void> {
    await AttackModel.destroy({
      where: { cardId: id },
    });
    await CardModel.destroy({
      where: { id },
    });
  }
}
