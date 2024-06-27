const queryparamsSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' }
  },
  required: ['id']
}

export const deleteCardSchema = {
  params: queryparamsSchema
}