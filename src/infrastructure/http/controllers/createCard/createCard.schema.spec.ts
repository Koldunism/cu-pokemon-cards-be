import Ajv, { ValidateFunction } from 'ajv'
import { createCardSchema } from './createCard.schema'

describe('createCardSchema', () => {
  let validate: ValidateFunction

  beforeAll(() => {
    const ajv = new Ajv()
    validate = ajv.compile(createCardSchema.body)
  })

  it('should validate a correct card object', () => {
    const validData = {
      name: 'Pikachu',
      type: 'electric',
      hp: 35,
      rarity: 'common',
      attacks: [
        { name: 'Thunder Shock', power: 40 },
        { name: 'Quick Attack', power: 30 }
      ],
      expansion: 'Base Set',
      weakness: 'ground',
      resistance: 'flying',
      defense: 50
    }

    const isValid = validate(validData)
    expect(isValid).toBe(true)
    expect(validate.errors).toBeNull()
  })

  it('should not validate a card object with an invalid type', () => {
    const invalidData = {
      name: 'Pikachu',
      type: 'invalidType',
      hp: 35,
      rarity: 'common',
      attacks: [
        { name: 'Thunder Shock', power: 40 },
        { name: 'Quick Attack', power: 30 }
      ],
      expansion: 'Base Set',
      weakness: 'ground',
      resistance: 'flying',
      defense: 50
    }

    const isValid = validate(invalidData)
    expect(isValid).toBe(false)
    expect(validate.errors).not.toBeNull()
  })

  it('should not validate a card object without required properties', () => {
    const invalidData = {
      type: 'electric',
      hp: 35,
      rarity: 'common',
      attacks: [
        { name: 'Thunder Shock', power: 40 },
        { name: 'Quick Attack', power: 30 }
      ],
      expansion: 'Base Set'
    }

    const isValid = validate(invalidData)
    expect(isValid).toBe(false)
    expect(validate.errors).not.toBeNull()
  })

  it('should not validate a card object with additional properties', () => {
    const invalidData = {
      name: 'Pikachu',
      type: 'electric',
      hp: 35,
      rarity: 'common',
      attacks: [
        { name: 'Thunder Shock', power: 40 },
        { name: 'Quick Attack', power: 30 }
      ],
      expansion: 'Base Set',
      weakness: 'ground',
      resistance: 'flying',
      defense: 50,
      extraProperty: 'notAllowed'
    }

    const isValid = validate(invalidData)
    expect(isValid).toBe(false)
    expect(validate.errors).not.toBeNull()
  })

  it('should not validate a card object with invalid attack format', () => {
    const invalidData = {
      name: 'Pikachu',
      type: 'electric',
      hp: 35,
      rarity: 'common',
      attacks: [
        { name: 'Thunder Shock', power: 'invalidPower' }, // Invalid power type
        { name: 'Quick Attack', power: 30 }
      ],
      expansion: 'Base Set',
      weakness: 'ground',
      resistance: 'flying',
      defense: 50
    }

    const isValid = validate(invalidData)
    expect(isValid).toBe(false)
    expect(validate.errors).not.toBeNull()
  })
})
