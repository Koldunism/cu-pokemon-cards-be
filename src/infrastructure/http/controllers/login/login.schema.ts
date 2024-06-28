const bodyJsonSchema = {
  type: 'object',
  required: ['username', 'password'],
  properties: {
    username: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  additionalProperties: false
}

export const loginSchema = {
  body: bodyJsonSchema
}
