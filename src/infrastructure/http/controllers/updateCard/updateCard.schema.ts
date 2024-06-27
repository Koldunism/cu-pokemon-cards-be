import { pokemonTypes, cardsRarity } from '../common/common.schema'

const attackItem = {
  type: 'object',
  required: ['name', 'power'],
  properties: {
    name: {
      type: 'string'
    },
    power: {
      type: 'number'
    }
  }
}

const bodyJsonSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    type: {
      type: 'string',
      enum: pokemonTypes
    },
    hp: {
      type: 'number'
    },
    attacks: {
      type: 'array',
      items: attackItem
    },
    rarity: {
      type: 'string',
      enum: cardsRarity
    },
    expansion: {
      type: 'string'
    },
    weakness: {
      type: 'string',
      enum: pokemonTypes
    },
    resistance: {
      type: 'string',
      enum: pokemonTypes
    },
    defense: {
      type: 'number'
    }
  },
  additionalProperties: false
}

const queryparamsSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'number' }
  }
}

export const updateCardSchema = {
  params: queryparamsSchema,
  body: bodyJsonSchema
}
