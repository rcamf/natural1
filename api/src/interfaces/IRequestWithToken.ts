import { Request } from "express";
import { IUser } from ".";

export interface IRequestWithToken extends Request { token: { _id: string }, currentUser: IUser };