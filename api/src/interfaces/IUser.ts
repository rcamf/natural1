import { Document } from "mongoose";
import { IGame } from "./IGame";

export interface IUser {
  _id?: string
  username: string
  email: string
  password: string
  salt: string
  displayName?: string
  games?: Array<IGame & Document>
  imageUrl: string
  isAdmin?: boolean
}

export interface IUserInputDTO {
  username?: string
  email?: string
  password?: string
  imageUrl?: string
  displayName?: string
}