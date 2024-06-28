import { User, UserParams } from './user'

describe('User Entity', () => {
  it('should create a user with all properties', () => {
    const params: UserParams = {
      id: 1,
      username: 'testuser',
      passwordHash: 'hashedpassword123'
    }

    const user = new User(params)

    expect(user).toBeDefined()
    expect(user.id).toBe(1)
    expect(user.username).toBe('testuser')
    expect(user.passwordHash).toBe('hashedpassword123')
  })

  it('should create a user without id', () => {
    const params: UserParams = {
      username: 'testuser',
      passwordHash: 'hashedpassword123'
    }

    const user = new User(params)

    expect(user).toBeDefined()
    expect(user.id).toBeUndefined()
    expect(user.username).toBe('testuser')
    expect(user.passwordHash).toBe('hashedpassword123')
  })
})
