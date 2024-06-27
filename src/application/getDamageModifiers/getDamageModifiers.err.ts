import { Result, UseCaseError } from '../../core'

export namespace GetDamageModifiersError {
  export class CardNotFound extends Result<UseCaseError> {
    constructor(id: number) {
      super(false, undefined, {
        code: 404,
        message: `Card not found! There is no Card with ID ${id}`
      } as UseCaseError)
    }
  }
}
