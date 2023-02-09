import { Document } from "mongodb"
import { ERollType } from "./ERollType"
import { IUser } from "./IUser"

export interface IRoll {
  _id?: string
  // type: ERollType
  messageId: string
  // playerId: string
  playerName: string
  description?: string
  individualRolls: [{
    formula: string
    result: number
    label?: string
    rawResult: number
  }],
  author: IUser & Document | string
  game: string
}