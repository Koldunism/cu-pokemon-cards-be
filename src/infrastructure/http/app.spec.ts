import { start } from './app'
import { FASTIFYCONFIG } from '../../config/index'

describe('app start', () => {
  it('/health reply with 200', async () => {
    const app = start(FASTIFYCONFIG)
    const res = await app.inject({
      method: 'GET',
      url: '/health'
    })

    expect(res.statusCode).toBe(200)
  })
})
