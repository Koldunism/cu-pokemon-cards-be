import { Result, UseCaseError } from '../../core'

export namespace GetCardByIdError {
  export class CardNotFound extends Result<any> {
    constructor(id: number) {
      super(false, undefined, {
        code: 404,
        message: `Card not found! There is no Card with ID ${id}`
      } as UseCaseError)
    }
  }
}
