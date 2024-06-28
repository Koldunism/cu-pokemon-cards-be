import { commonErrorResponses } from '../common/common.schema'

const cardResponse = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    id: { type: 'number' }
  }
}

const queryparamsSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' }
  },
  required: ['id']
}

const responseSchema = {
  200: {
    type: 'object',
    description: 'Cards with modifiers obtained',
    properties: {
      weakAgainst: {
        type: 'array',
        items: cardResponse
      },
      resistantAgainst: {
        type: 'array',
        items: cardResponse
      }
    }
  },
  ...commonErrorResponses
}

export const getDamageModifiersSchema = {
  params: queryparamsSchema,
  response: responseSchema
}
