import { FastifyRequest } from 'fastify'

export type SimulateBattleReq = FastifyRequest<{
  Querystring: {
    attackerId: number
    defenderId: number
  }
}>
