import { LoginUseCase } from './login.uc'
import { UserRepository } from '../../domain/repositories/user.repo'
import { LoginInput } from './login.dto'
import { LoginError } from './login.err'
import { AppError } from '../../core'
import * as jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn()
}))

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase
  let mockUserRepository: jest.Mocked<UserRepository>

  const mockUser = {
    id: 1,
    username: 'testuser',
    passwordHash: 'hashedpassword123'
  }

  beforeEach(() => {
    mockUserRepository = {
      findByUsername: jest.fn()
    } as unknown as jest.Mocked<UserRepository>
    loginUseCase = new LoginUseCase(mockUserRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return a token if credentials are valid', async () => {
    mockUserRepository.findByUsername.mockResolvedValue(mockUser)
    ;(jwt.sign as jest.Mock).mockReturnValue('validToken')

    const input: LoginInput = { username: 'testuser', passwordHash: 'hashedpassword123' }
    const result = await loginUseCase.exec(input)

    expect(mockUserRepository.findByUsername).toHaveBeenCalledWith('testuser')
    expect(jwt.sign).toHaveBeenCalledWith({ userId: mockUser.id }, process.env.JWT_SECRET!, { expiresIn: '1h' })
    expect(result.isSuccessful).toBe(true)
    expect(result.value).toEqual({ token: 'validToken' })
  })

  it('should return InvalidCredentials error if username is not found', async () => {
    mockUserRepository.findByUsername.mockResolvedValue(null)

    const input: LoginInput = { username: 'testuser', passwordHash: 'hashedpassword123' }
    const result = await loginUseCase.exec(input)

    expect(mockUserRepository.findByUsername).toHaveBeenCalledWith('testuser')
    expect(result.isFailure).toBe(true)
    expect(result).toBeInstanceOf(LoginError.InvalidCredentials)
  })

  it('should return InvalidCredentials error if passwordHash is incorrect', async () => {
    mockUserRepository.findByUsername.mockResolvedValue(mockUser)

    const input: LoginInput = { username: 'testuser', passwordHash: 'wrongpassword' }
    const result = await loginUseCase.exec(input)

    expect(mockUserRepository.findByUsername).toHaveBeenCalledWith('testuser')
    expect(result.isFailure).toBe(true)
    expect(result).toBeInstanceOf(LoginError.InvalidCredentials)
  })

  it('should return UnexpectedError if an error occurs', async () => {
    mockUserRepository.findByUsername.mockImplementation(() => {
      throw new Error('DB error')
    })

    const input: LoginInput = { username: 'testuser', passwordHash: 'hashedpassword123' }
    const result = await loginUseCase.exec(input)

    expect(result.isFailure).toBe(true)
    expect(result).toBeInstanceOf(AppError.UnexpectedError)
  })
})
