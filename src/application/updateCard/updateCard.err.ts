import { Result, UseCaseError } from '../../core'

export namespace UpdateCardError {
  export class CardUpdateFailed extends Result<UseCaseError> {
    constructor() {
      super(false, undefined, {
        code: 500,
        message: 'Something went wrong, check logs for more info.'
      } as UseCaseError)
    }
  }
}
