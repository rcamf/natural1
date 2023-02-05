import { Request } from "express";
import { IUser } from ".";

export interface IRequestWithToken extends Request { auth: { _id: string }, currentUser: IUser };