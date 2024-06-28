import { commonErrorResponses } from '../common/common.schema'

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
    description: 'card deleted successfuly',
    properties: {
      success: { type: 'boolean' }
    }
  },
  ...commonErrorResponses
}

export const deleteCardSchema = {
  params: queryparamsSchema,
  response: responseSchema
}
