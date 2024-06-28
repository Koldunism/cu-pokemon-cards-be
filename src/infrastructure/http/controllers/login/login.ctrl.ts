import { FastifyReply } from 'fastify'
import { BaseController, Result, UseCaseError } from '../../../../core'
import { LoginUseCase } from '../../../../application/login'
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
      const { username, password }: LoginInput = req.body

      const result = await this.loginUseCase.exec({ username, password })

      if (result.isFailure) {
        const error = result as Result<UseCaseError>
        return this.unauthorized(reply, error.errorValue.message)
      }

      const loginOutput = result.value as LoginOutput
      return this.ok(reply, loginOutput)
    } catch (error: any) {
      console.error(`Unexpected error produced at ${this.constructor.name}: ${error}`)
      return this.internalServerError(reply, error)
    }
  }
}
