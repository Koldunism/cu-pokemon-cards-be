const querystringSchema = {
  type: 'object',
  required: ['limit', 'offset', 'sortBy', 'order'],
  properties: {
    limit: { type: 'integer', minimum: 1, default: 10 },
    offset: { type: 'integer', minimum: 0, default: 0 },
    sortBy: { type: 'string', enum: ['name', 'type', 'hp', 'rarity', 'expansion'], default: 'name' },
    order: { type: 'string', enum: ['asc', 'desc'], default: 'asc' }
  },
  additionalProperties: false
}

export const getAllCardsSchema = {
  querystring: querystringSchema
}
