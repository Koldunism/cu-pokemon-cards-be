import { FastifyRequest } from 'fastify'

export type LoginReq = FastifyRequest<{
  Body: { username: string; password: string }
}>
