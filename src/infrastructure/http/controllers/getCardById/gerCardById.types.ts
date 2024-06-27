import { FastifyRequest } from 'fastify'

export type GetCardByIdReq = FastifyRequest<{
  Params: { id: number }
}>
