import { Paginated, PaginatedQueryParams, SortQueryParams } from '../../core'
import { Card } from '../entities/card'

export interface CardRepository {
  createCard(card: Card): Promise<Card | null>
  getAllCardsPaginated(dataLimiters: DataLimiters, filters?: CardFilters): Promise<Paginated<Card> | null>
  getCardById(id: number): Promise<Card | null>
  updateCard(card: Partial<Card>): Promise<boolean>
  deleteCard(id: number): Promise<boolean>
  getCardsByType(type: string): Promise<Array<Card>>
}

export type DataLimiters = PaginatedQueryParams & SortQueryParams
export type CardFilters =
  | {
      name?: string
      type?: string
      hp?: number
      rarity?: string
      expansion?: string
      weakness?: string
      resistance?: string
      defense?: number
      id?: number
    }
  | undefined
