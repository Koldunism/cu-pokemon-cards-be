import { Card } from '../../domain/entities'

export type GetCardByIdInput = { id: number }

export type GetCardByIdOutput = {
  data: Card
}
