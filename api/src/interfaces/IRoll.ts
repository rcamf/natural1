import { ERollType } from "./ERollType"

export interface IRoll {
  _id?: string
  type: ERollType
  messageId: string
  playerId: string
  playerName: string
  description?: string
  individualRolls: [{
    formula: string
    result: number
    label?: string
    rawResult: number
  }],
  author: string
  game: string
}