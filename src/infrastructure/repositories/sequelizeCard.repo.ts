import { Card, Attack } from "../../domain/entities";
import { CardRepository } from "../../domain/repositories/card.repo";
import CardModel from "../models/card.model";
import AttackModel from "../models/attack.model";
import sequelize from "../database";

//TODO: trycatch blocks
//TODO: transaction methods with multi calls

export class SequelizeCardRepository implements CardRepository {
  async createCard(card: Card): Promise<Card> {
    const cardModel = await CardModel.create(
      {
        name: card.name,
        type: card.type,
        hp: card.hp,
        weakness: card.weakness,
        resistance: card.resistance,
        rarity: card.rarity,
        attacks: card.attacks.map((attack) => ({
          name: attack.name,
          power: attack.power,
        })),
      },
      {
        include: [AttackModel],
      }
    );

    return cardModel as Card;
  }

  async getAllCards(): Promise<Card[]> {
    const cardModels = await CardModel.findAll({ include: [AttackModel] });
    return cardModels.map(
      (cardModel) =>
        new Card(
          cardModel.name,
          cardModel.type,
          cardModel.hp,
          cardModel.rarity,
          cardModel.attacks
            ? cardModel.attacks.map(
                (attack) => new Attack(attack.name, attack.power)
              )
            : [],
          cardModel.weakness,
          cardModel.resistance
        )
    );
  }

  async getCardById(id: number): Promise<Card | null> {
    const cardModel = await CardModel.findByPk(id, { include: [AttackModel] });
    if (!cardModel) {
      return null;
    }
    return new Card(
      cardModel.name,
      cardModel.type,
      cardModel.hp,
      cardModel.rarity,
      cardModel.attacks
        ? cardModel.attacks.map(
            (attack) => new Attack(attack.name, attack.power)
          )
        : [],
      cardModel.weakness,
      cardModel.resistance
    );
  }

  async updateCard(id: number, card: Card): Promise<void> {
    const transaction = sequelize.transaction(); //TODO transaction example.

    await CardModel.update(
      {
        name: card.name,
        type: card.type,
        hp: card.hp,
        weakness: card.weakness,
        resistance: card.resistance,
        rarity: card.rarity,
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
