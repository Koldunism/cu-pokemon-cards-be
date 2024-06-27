import { FastifyRequest } from 'fastify'
import { Card } from '../../../../domain/entities'

export type UpdateCardReq = FastifyRequest<{
  Body: Partial<Card>
  Params: { id: number }
}>
