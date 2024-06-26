import { Result, UseCaseError } from ".";

export namespace AppError {
  export class UnexpectedError extends Result<UseCaseError> {
    private constructor(err: any) {
      super(false, undefined, {
        message: `An unexpected error occurred: ${err.message}`,
        error: err,
      } as UseCaseError);
    }

    public static create(err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }
}
