const pokemonTypes = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];
const cardsRarity = ["common", "uncommon", "rare"];

const attackItem = {
  type: "object",
  required: ["name", "power"],
  properties: {
    name: {
      type: "string",
    },
    power: {
      type: "number",
    },
  },
};

const bodyJsonSchema = {
  type: "object",
  required: ["name", "type", "hp", "rarity", "attacks"],
  properties: {
    name: {
      type: "string",
    },
    type: {
      type: "string",
      enum: pokemonTypes,
    },
    hp: {
      type: "number",
    },
    weakness: {
      type: "string",
      enum: pokemonTypes,
    },
    resistance: {
      type: "string",
      enum: pokemonTypes,
    },
    rarity: {
      type: "string",
      enum: cardsRarity,
    },
    attacks: {
      type: "array",
      items: attackItem,
    },
  },
  additionalProperties: false,
};

export const createCardSchema = {
  body: bodyJsonSchema,
};
