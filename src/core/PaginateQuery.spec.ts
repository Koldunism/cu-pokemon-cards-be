import { Paginated } from './PaginateQuery'

describe('PaginateQuery', () => {
  it('should create paginatequery object', async () => {
    const paginated = new Paginated({
      offset: 1,
      limit: 10,
      total: 100,
      hasNext: true,
      data: []
    })

    expect(paginated.offset).toEqual(1)
    expect(paginated.limit).toEqual(10)
    expect(paginated.total).toEqual(100)
    expect(paginated.hasNext).toEqual(true)
    expect(paginated.data).toEqual([])
  })
})
