import { FastifyRequest } from 'fastify'
import { PaginatedQueryParams, SortQueryParams } from '../../../../core'

export type GetAllCardsReq = FastifyRequest<{
  Querystring: PaginatedQueryParams & SortQueryParams
}>
