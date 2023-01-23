import { Document } from "mongoose";
import { IUser } from "./IUser";
import { IRoll } from "./IRoll";

export interface IGame {
  _id?: string,
  name: string,
  owner: IUser & Document
  description?: string
  members: Array<IUser & Document>
}

export interface IGameInputDTO {
  name?: string
  owner?: string
  description?: string
}