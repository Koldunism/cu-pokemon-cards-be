import { Result } from '.'

describe('Result', () => {
  it('should create a successful result', () => {
    const value = { some: 'value' }
    const result = Result.success(value)

    expect(result.isSuccessful).toBe(true)
    expect(result.isFailure).toBe(false)
    expect(result.value).toEqual(value)
  })

  it('should create a failed result', () => {
    const error = 'An error occurred'
    const result = Result.fail(error)

    expect(result.isSuccessful).toBe(false)
    expect(result.isFailure).toBe(true)
    expect(result.errorValue).toEqual(error)
    expect(() => result.value).toThrow('Invalid operation, cannot get values')
  })

  it('should fail if tries to create a successful result while having errors', () => {
    const value = 'value'
    const error = 'An error occurred'

    expect(() => new Result<string>(true, value, error)).toThrow(
      'Invalid operation, results cannot be successful and have errors at the same time.'
    )
  })

  it('should fail if tries to create a failed result while not having errors', () => {
    const value = { some: 'value' }

    expect(() => new Result(false, value, undefined)).toThrow(
      'Invalid operation, results cannot be failure without errors.'
    )
  })

  it('should freeze the object after creation', () => {
    const value = { some: 'value' }
    const result = Result.success(value)

    expect(Object.isFrozen(result)).toBe(true)
  })

  it('should throw if tries to reach values on a failed result', () => {
    const error = 'An error occurred'
    const result = Result.fail(error)

    expect(() => result.value).toThrow('Invalid operation, cannot get values')
  })
})
