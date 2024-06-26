import { Card } from "../entities/card";

export interface CardRepository {
  createCard(card: Card): Promise<Card | null>;
  getAllCards(): Promise<Card[]>;
  getCardById(id: number): Promise<Card | null>;
  updateCard(id: number, card: Card): Promise<void>;
  deleteCard(id: number): Promise<void>;
}
