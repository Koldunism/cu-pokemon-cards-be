export class Result<T> {
  public isSuccessful: boolean
  public isFailure: boolean
  private errors?: T | string
  private _props?: T

  public constructor(isSuccessful: boolean, props?: T, errors?: T) {
    if (isSuccessful && errors) {
      throw new Error('Invalid operation, results cannot be successful and have errors at the same time.')
    }
    if (!isSuccessful && !errors) {
      throw new Error('Invalid operation, results cannot be failure without errors.')
    }

    this.isSuccessful = isSuccessful
    this.isFailure = !isSuccessful
    this.errors = errors
    this._props = props
    Object.freeze(this)
  }

  get value(): T {
    if (!this._props) {
      throw new Error('Invalid operation, cannot get values')
    }
    return this._props
  }

  get errorValue(): T {
    return this.errors as T
  }

  public static success<T>(props?: T): Result<T> {
    return new Result<T>(true, props, undefined)
  }

  public static fail<T>(errors: any): Result<T> {
    return new Result<T>(false, undefined, errors)
  }
}
