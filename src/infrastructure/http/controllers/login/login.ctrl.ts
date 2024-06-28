import { FastifyReply } from 'fastify'
import { BaseController, Result, UseCaseError } from '../../../../core'
import { LoginError, LoginUseCase } from '../../../../application/login'
import { LoginInput, LoginOutput } from '../../../../application/login'
import { LoginReq } from './login.types'

export class LoginController extends BaseController {
  private loginUseCase: LoginUseCase

  constructor(loginUseCase: LoginUseCase) {
    super()
    this.loginUseCase = loginUseCase
  }

  public async exec(req: LoginReq, reply: FastifyReply) {
    try {
      const { username, passwordHash }: LoginInput = req.body

      const result = await this.loginUseCase.exec({ username, passwordHash })

      if (result.isFailure) {
        const error = result as Result<UseCaseError>
        const errorMsg = error.errorValue.message
        console.error(`Error produced while logging in: ${errorMsg}`)
        switch (error.constructor) {
          case LoginError.InvalidCredentials:
            return this.unauthorized(reply, errorMsg)
          default:
            return this.internalServerError(reply, result.errorValue)
        }
      }

      const loginOutput = result.value as LoginOutput
      return this.ok(reply, loginOutput)
    } catch (error: any) {
      console.error(`Unexpected error produced at ${this.constructor.name}: ${error}`)
      return this.internalServerError(reply, error)
    }
  }
}
