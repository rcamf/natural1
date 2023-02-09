import { Document } from "mongoose";
import { IUser } from "./IUser";
import { IRoll } from "./IRoll";

export interface IGame {
  _id?: string,
  name: string,
  owner: IUser & Document | string
  description?: string
  members: Array<IUser & Document>
}