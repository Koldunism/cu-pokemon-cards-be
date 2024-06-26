import { UseCaseError } from '.'

class CustomError extends UseCaseError {
  constructor(message: string) {
    super(message)
  }
}

describe('UseCaseError', () => {
  it('should create an instance of UseCaseError', () => {
    const error = new CustomError('An error occurred')
    expect(error).toBeInstanceOf(UseCaseError)
    expect(error.message).toBe('An error occurred')
  })
})
