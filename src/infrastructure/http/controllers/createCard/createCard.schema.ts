import { cardResponseSchema, cardsRarity, commonErrorResponses, pokemonTypes } from '../common/common.schema'

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
  required: ['name', 'type', 'hp', 'rarity', 'attacks', 'expansion'],
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

const responseSchema = {
  200: {
    type: 'object',
    description: 'Card created successfuly',
    properties: {
      data: cardResponseSchema
    }
  },
  ...commonErrorResponses
}

export const createCardSchema = {
  body: bodyJsonSchema,
  response: responseSchema
}
