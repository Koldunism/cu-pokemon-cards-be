const querystringSchema = {
  type: 'object',
  required: ['attackerId', 'defenderId'],
  properties: {
    attackerId: { type: 'number' },
    defenderId: { type: 'number' }
  },
  additionalProperties: false
}

export const simulateBattleSchema = {
  querystring: querystringSchema
}
