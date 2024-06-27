import { FastifyRequest } from 'fastify'
import { PaginatedQueryParams, SortQueryParams } from '../../../../core'
import { CardFilters } from '../../../../domain/repositories/card.repo'

export type GetAllCardsReq = FastifyRequest<{
  Querystring: PaginatedQueryParams & SortQueryParams & CardFilters
}>
