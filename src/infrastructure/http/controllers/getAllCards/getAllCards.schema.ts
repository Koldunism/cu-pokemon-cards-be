const pokemonTypes = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy'
]
const cardsRarity = ['common', 'uncommon', 'rare']

const querystringSchema = {
  type: 'object',
  required: ['limit', 'offset', 'sortBy', 'order'],
  properties: {
    limit: { type: 'integer', minimum: 1, default: 10 },
    offset: { type: 'integer', minimum: 0, default: 0 },
    sortBy: { type: 'string', enum: ['name', 'type', 'hp', 'rarity', 'expansion'], default: 'name' },
    order: { type: 'string', enum: ['asc', 'desc'], default: 'asc' },
    name: { type: 'string' },
    type: { type: 'string', enum: pokemonTypes },
    hp: { type: 'number' },
    rarity: { type: 'string', enum: cardsRarity },
    expansion: { type: 'string' },
    weakness: { type: 'string', enum: pokemonTypes },
    resistance: { type: 'string', enum: pokemonTypes },
    defense: { type: 'number' }
  },
  additionalProperties: false
}

export const getAllCardsSchema = {
  querystring: querystringSchema
}
