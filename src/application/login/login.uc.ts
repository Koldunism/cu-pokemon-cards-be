import { AppError, BaseUseCase, Result } from '../../core'
import { UserRepository } from '../../domain/repositories/user.repo'
import { LoginInput, LoginOutput } from './login.dto'
import { LoginError } from './login.err'
import * as jwt from 'jsonwebtoken'

type UseCaseResult = AppError.UnexpectedError | Result<LoginOutput> | LoginError.InvalidCredentials

export class LoginUseCase extends BaseUseCase<LoginInput, UseCaseResult> {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    super()
    this.userRepository = userRepository
  }

  public async exec(input: LoginInput) {
    try {
      const user = await this.userRepository.findByUsername(input.username)
      if (!user) {
        return new LoginError.InvalidCredentials()
      }

      if (input.password !== user.passwordHash) {
        return new LoginError.InvalidCredentials()
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' })

      return Result.success<LoginOutput>({ token })
    } catch (error) {
      console.error('Error at LoginUseCase:', error)
      return AppError.UnexpectedError.create(error)
    }
  }
}
