import { cardResponseSchema, commonErrorResponses } from '../common/common.schema'

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
    description: 'Card obtained',
    properties: {
      data: cardResponseSchema
    }
  },
  ...commonErrorResponses
}

export const getCardByIdSchema = {
  params: queryparamsSchema,
  response: responseSchema
}
