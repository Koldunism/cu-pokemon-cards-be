import { Attack, AttackParams } from './attack'

describe('Attack', () => {
  it('should create an instance of Attack with required parameters', () => {
    const params: AttackParams = {
      name: 'Thunder Shock',
      power: 40
    }
    const attack = new Attack(params)

    expect(attack).toBeInstanceOf(Attack)
    expect(attack.name).toBe('Thunder Shock')
    expect(attack.power).toBe(40)
    expect(attack.id).toBeUndefined()
  })

  it('should create an instance of Attack with optional id', () => {
    const params: AttackParams = {
      name: 'Thunder Shock',
      power: 40,
      id: 1
    }
    const attack = new Attack(params)

    expect(attack).toBeInstanceOf(Attack)
    expect(attack.name).toBe('Thunder Shock')
    expect(attack.power).toBe(40)
    expect(attack.id).toBe(1)
  })

  it('should set the name property correctly', () => {
    const params: AttackParams = {
      name: 'Quick Attack',
      power: 30
    }
    const attack = new Attack(params)

    expect(attack.name).toBe('Quick Attack')
  })

  it('should set the power property correctly', () => {
    const params: AttackParams = {
      name: 'Quick Attack',
      power: 30
    }
    const attack = new Attack(params)

    expect(attack.power).toBe(30)
  })

  it('should set the id property correctly if provided', () => {
    const params: AttackParams = {
      name: 'Quick Attack',
      power: 30,
      id: 2
    }
    const attack = new Attack(params)

    expect(attack.id).toBe(2)
  })
})
