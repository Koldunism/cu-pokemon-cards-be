import { Attack } from "./attack";

export class Card {
  constructor(
    public name: string,
    public type: string,
    public hp: number,
    public rarity: string,
    public attacks: Attack[] = [],
    public weakness?: string,
    public resistance?: string
  ) {}
}
