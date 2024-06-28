import { Result, UseCaseError } from '../../core'

export namespace LoginError {
  export class InvalidCredentials extends Result<UseCaseError> {
    constructor() {
      super(false, undefined, {
        code: 401,
        message: 'Invalid credentials'
      } as UseCaseError)
    }
  }
}
