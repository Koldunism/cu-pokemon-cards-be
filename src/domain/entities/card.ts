import { Attack } from "./attack";

export class Card {
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public hp: number,
    public attack: number,
    public weakness: string,
    public resistance: string,
    public attacks: Attack[] = []
  ) {}
}
