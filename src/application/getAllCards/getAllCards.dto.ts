import { Paginated, PaginatedQueryParams, SortQueryParams } from '../../core'
import { Card } from '../../domain/entities'

export type GetAllCardsInput = PaginatedQueryParams & SortQueryParams

export type GetAllCardsOutput = Paginated<Card> & SortQueryParams
