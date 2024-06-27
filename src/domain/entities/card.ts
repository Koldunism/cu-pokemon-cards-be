import { Attack } from './attack'

export interface CardParams {
  id?: number
  name: string
  type: string
  hp: number
  weakness?: string
  resistance?: string
  defense?: number
  rarity: string
  expansion: string
  attacks?: Attack[]
}

export class Card {
  public id?: number
  public name: string
  public type: string
  public hp: number
  public weakness?: string
  public resistance?: string
  public defense?: number
  public rarity: string
  public expansion: string
  public attacks: Attack[]

  constructor(params: CardParams) {
    this.id = params.id
    this.name = params.name
    this.type = params.type
    this.hp = params.hp
    this.weakness = params.weakness
    this.resistance = params.resistance
    this.defense = params.defense
    this.rarity = params.rarity
    this.expansion = params.expansion
    this.attacks = params.attacks || []
  }
}
