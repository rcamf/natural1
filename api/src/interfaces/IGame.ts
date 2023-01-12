import { Document } from "mongoose";
import { IUser } from "./IUser";
import { IRoll } from "./IRoll";

export interface IGame {
  _id?: string,
  name: string,
  owner: IUser & Document
  members: Array<IUser & Document>
  rolls: Array<IRoll & Document>
}