import { Card } from '../../domain/entities'

export type UpdateCardInput = Partial<Card>

export type UpdateCardOutput = {
  success: boolean
}
