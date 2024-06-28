export const pokemonTypes = [
  'Normal',
  'Fire',
  'Water',
  'Electric',
  'Grass',
  'Ice',
  'Fighting',
  'Poison',
  'Ground',
  'Flying',
  'Psychic',
  'Bug',
  'Rock',
  'Ghost',
  'Dragon',
  'Dark',
  'Steel',
  'Fairy'
]

export const cardsRarity = ['Common', 'Uncommon', 'Rare']

export const attackResponseSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    power: { type: 'number' }
  }
}

export const cardResponseSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    type: { type: 'string' },
    hp: { type: 'string' },
    weakness: { type: 'string' },
    resistance: { type: 'string' },
    defense: { type: 'number' },
    rarity: { type: 'string' },
    expansion: { type: 'string' },
    attacks: {
      type: 'array',
      items: attackResponseSchema
    }
  }
}

export const commonErrorResponses = {
  400: {
    description: 'Bad Request',
    type: 'object',
    properties: {
      code: {
        type: 'string'
      },
      message: {
        type: 'string'
      }
    }
  },
  401: {
    description: 'Unauthorized',
    type: 'object',
    properties: {
      code: {
        type: 'string'
      },
      message: {
        type: 'string'
      }
    }
  },
  403: {
    description: 'Forbidden',
    type: 'object',
    properties: {
      code: {
        type: 'string'
      },
      message: {
        type: 'string'
      }
    }
  },
  404: {
    description: 'Not Found',
    type: 'object',
    properties: {
      code: {
        type: 'string'
      },
      message: {
        type: 'string'
      }
    }
  },
  500: {
    description: 'Internal server error',
    type: 'object',
    properties: {
      code: {
        type: 'string'
      },
      message: {
        type: 'string'
      }
    }
  },
  503: {
    description: 'Service unavailable',
    type: 'object',
    properties: {
      code: {
        type: 'string'
      },
      message: {
        type: 'string'
      }
    }
  },
  504: {
    description: 'Gateway timeout',
    type: 'object',
    properties: {
      code: {
        type: 'string'
      },
      message: {
        type: 'string'
      }
    }
  },
  default: {
    description: 'Internal server error',
    type: 'object',
    properties: {
      code: {
        type: 'string'
      },
      message: {
        type: 'string'
      }
    }
  }
}
