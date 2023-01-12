import { Document } from "mongoose";
import { IGame } from "./IGame";

export interface IUser {
  _id?: string,
  username: string,
  email: string,
  displayName: string,
  games: Array<IGame & Document>
}