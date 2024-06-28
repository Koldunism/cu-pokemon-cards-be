const bodyJsonSchema = {
  type: 'object',
  required: ['username', 'passwordHash'],
  properties: {
    username: {
      type: 'string'
    },
    passwordHash: {
      type: 'string'
    }
  },
  additionalProperties: false
}

export const loginSchema = {
  body: bodyJsonSchema
}
