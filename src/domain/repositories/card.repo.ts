import { Paginated, PaginatedQueryParams, SortQueryParams } from '../../core'
import { Card } from '../entities/card'

export interface CardRepository {
  createCard(card: Card): Promise<Card | null>
  getAllCardsPaginated(filters: PaginatedQueryParams & SortQueryParams): Promise<Paginated<Card> | null>
  getCardById(id: number): Promise<Card | null>
  updateCard(card: Partial<Card>): Promise<boolean>
  deleteCard(id: number): Promise<void>
}
