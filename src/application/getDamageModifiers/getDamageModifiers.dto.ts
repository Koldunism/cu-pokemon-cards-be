export type GetDamageModifiersInput = { id: number }

export type GetDamageModifiersOutput = {
  weakAgainst: Array<CardReference>
  resistantAgainst: Array<CardReference>
}

export type CardReference = {
  id: number
  name: string
}
