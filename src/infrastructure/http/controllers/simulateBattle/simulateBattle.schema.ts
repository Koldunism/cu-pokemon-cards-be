import { commonErrorResponses } from '../common/common.schema'

const querystringSchema = {
  type: 'object',
  required: ['attackerId', 'defenderId'],
  properties: {
    attackerId: { type: 'number' },
    defenderId: { type: 'number' }
  },
  additionalProperties: false
}

const responseSchema = {
  200: {
    type: 'object',
    description: 'Battle simulation OK',
    properties: {
      attackerWins: { type: 'boolean' },
      attackerDamage: { type: 'number' },
      defenderHP: { type: 'number' }
    }
  },
  ...commonErrorResponses
}

export const simulateBattleSchema = {
  querystring: querystringSchema,
  response: responseSchema
}
