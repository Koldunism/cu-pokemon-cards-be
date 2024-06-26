import { Card, CardParams } from './card'
import { Attack } from './attack'

describe('Card', () => {
  it('should create an instance of Card with required parameters', () => {
    const params: CardParams = {
      name: 'Pikachu',
      type: 'Electric',
      hp: 35,
      rarity: 'Common',
      expansion: 'Base Set'
    }
    const card = new Card(params)

    expect(card).toBeInstanceOf(Card)
    expect(card.name).toBe('Pikachu')
    expect(card.type).toBe('Electric')
    expect(card.hp).toBe(35)
    expect(card.rarity).toBe('Common')
    expect(card.expansion).toBe('Base Set')
    expect(card.attacks).toEqual([])
    expect(card.weakness).toBeUndefined()
    expect(card.resistance).toBeUndefined()
    expect(card.defense).toBeUndefined()
    expect(card.id).toBeUndefined()
  })

  it('should create an instance of Card with all parameters', () => {
    const attacks: Attack[] = [new Attack({ name: 'Thunder Shock', power: 40 })]
    const params: CardParams = {
      name: 'Pikachu',
      type: 'Electric',
      hp: 35,
      rarity: 'Common',
      expansion: 'Base Set',
      attacks: attacks,
      weakness: 'Ground',
      resistance: 'Fighting',
      defense: 50,
      id: 1
    }
    const card = new Card(params)

    expect(card).toBeInstanceOf(Card)
    expect(card.name).toBe('Pikachu')
    expect(card.type).toBe('Electric')
    expect(card.hp).toBe(35)
    expect(card.rarity).toBe('Common')
    expect(card.expansion).toBe('Base Set')
    expect(card.attacks).toEqual(attacks)
    expect(card.weakness).toBe('Ground')
    expect(card.resistance).toBe('Fighting')
    expect(card.defense).toBe(50)
    expect(card.id).toBe(1)
  })

  it('should set default values for optional parameters', () => {
    const params: CardParams = {
      name: 'Pikachu',
      type: 'Electric',
      hp: 35,
      rarity: 'Common',
      expansion: 'Base Set'
    }
    const card = new Card(params)

    expect(card.attacks).toEqual([])
    expect(card.weakness).toBeUndefined()
    expect(card.resistance).toBeUndefined()
    expect(card.defense).toBeUndefined()
    expect(card.id).toBeUndefined()
  })

  it('should correctly set the attacks array', () => {
    const attacks: Attack[] = [
      new Attack({ name: 'Thunder Shock', power: 40 }),
      new Attack({ name: 'Quick Attack', power: 30 })
    ]
    const params: CardParams = {
      name: 'Pikachu',
      type: 'Electric',
      hp: 35,
      rarity: 'Common',
      expansion: 'Base Set',
      attacks: attacks
    }
    const card = new Card(params)

    expect(card.attacks).toEqual(attacks)
  })
})
