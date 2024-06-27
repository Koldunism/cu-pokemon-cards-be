import { FastifyRequest } from 'fastify'

export type GetDamageModifiersReq = FastifyRequest<{
  Params: { id: number }
}>
