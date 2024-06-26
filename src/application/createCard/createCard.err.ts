import { Result, UseCaseError } from '../../core'

export namespace CreateCardErrors {
  export class CardCreationFailed extends Result<UseCaseError> {
    constructor() {
      super(false, undefined, {
        code: 409,
        message: 'Could not create the resource, check logs for more info.'
      } as UseCaseError)
    }
  }
}
