import { Attack } from './attack'

export interface CardParams {
  name: string
  type: string
  hp: number
  rarity: string
  expansion: string
  attacks?: Attack[]
  weakness?: string
  resistance?: string
  id?: number
}

export class Card {
  public name: string
  public type: string
  public hp: number
  public rarity: string
  public expansion: string
  public attacks: Attack[]
  public weakness?: string
  public resistance?: string
  public id?: number

  constructor(params: CardParams) {
    this.name = params.name
    this.type = params.type
    this.hp = params.hp
    this.rarity = params.rarity
    this.expansion = params.expansion
    this.attacks = params.attacks || []
    this.weakness = params.weakness
    this.resistance = params.resistance
    this.id = params.id
  }
}
