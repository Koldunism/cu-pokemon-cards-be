import { pokemonTypes, cardsRarity, cardResponseSchema, commonErrorResponses } from '../common/common.schema'

const querystringSchema = {
  type: 'object',
  required: ['limit', 'offset', 'sortBy', 'order'],
  properties: {
    limit: { type: 'integer', minimum: 1, default: 10 },
    offset: { type: 'integer', minimum: 0, default: 0 },
    sortBy: { type: 'string', enum: ['name', 'type', 'hp', 'rarity', 'expansion'], default: 'name' },
    order: { type: 'string', enum: ['asc', 'desc'], default: 'asc' },
    name: { type: 'string' },
    type: { type: 'string', enum: pokemonTypes },
    hp: { type: 'number' },
    rarity: { type: 'string', enum: cardsRarity },
    expansion: { type: 'string' },
    weakness: { type: 'string', enum: pokemonTypes },
    resistance: { type: 'string', enum: pokemonTypes },
    defense: { type: 'number' }
  },
  additionalProperties: false
}

const responseSchema = {
  200: {
    type: 'object',
    description: 'Cards obtained',
    properties: {
      data: {
        type: 'array',
        items: cardResponseSchema
      },
      sortBy: { type: 'string' },
      order: { type: 'string' },
      limit: { type: 'integer' },
      offset: { type: 'integer' },
      hasNext: { type: 'integer' },
      total: { type: 'integer' }
    }
  },
  ...commonErrorResponses
}

export const getAllCardsSchema = {
  querystring: querystringSchema,
  response: responseSchema
}
