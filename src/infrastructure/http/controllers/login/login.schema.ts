import { commonErrorResponses } from '../common/common.schema'

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

const responseSchema = {
  200: {
    type: 'object',
    description: 'Login succeed',
    properties: {
      token: { type: 'string' }
    }
  },
  ...commonErrorResponses
}

export const loginSchema = {
  body: bodyJsonSchema,
  response: responseSchema
}
