export type PaginatedQueryParams = {
  offset: number
  limit: number
}

export class Paginated<T> {
  readonly offset: number
  readonly limit: number
  readonly total: number
  readonly hasNext: boolean
  readonly data: readonly T[]

  constructor(props: Paginated<T>) {
    ;(this.offset = props.offset),
      (this.limit = props.limit),
      (this.total = props.total),
      (this.hasNext = props.total > props.offset * props.limit + props.data.length),
      (this.data = props.data)
  }
}
