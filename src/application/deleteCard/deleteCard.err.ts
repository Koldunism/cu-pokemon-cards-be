import { Result, UseCaseError } from '../../core'

export namespace DeleteCardError {
  export class CardDeletionFailed extends Result<UseCaseError> {
    constructor() {
      super(false, undefined, {
        code: 204,
        message: 'Could not delete the resource, check logs for more info.'
      } as UseCaseError)
    }
  }
}
