import { FastifyRequest } from 'fastify'

export type DeleteCardReq = FastifyRequest<{
  Params: { id: number }
}>
