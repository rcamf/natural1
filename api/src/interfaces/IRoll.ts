export interface IRoll {
  _id?: string
  formula: string
  type: ERollType
  playerId: string
  playerName: string
  description?: string
  individualRolls: [{
    formula: string
    result: number
  }],
  result: number
  author: string
  game: string
}