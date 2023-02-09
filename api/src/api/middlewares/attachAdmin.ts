import { NextFunction, Response } from "express";
import mongoose from "mongoose";
import Container from "typedi";
import winston from "winston";
import { IRequestWithToken, IUser } from "../../interfaces";

const isAdmin = async (req: IRequestWithToken, res: Response, next: NextFunction) => {
  const Logger = Container.get<winston.Logger>('logger');
  try {
    const UserModel = Container.get('userModel') as mongoose.Model<IUser & mongoose.Document>;

    Logger.info("Requesting for: ", req.auth._id)
    const userRecord = await UserModel.findById(req.auth._id);

    if (!userRecord || !userRecord.isAdmin) {
      return res.sendStatus(401);
    }

    const currentUser = userRecord.toObject<IUser>();
    Reflect.deleteProperty(currentUser, 'password');
    Reflect.deleteProperty(currentUser, 'salt');
    req.currentUser = currentUser;
    return next();
  } catch (e) {
    Logger.error('Error attaching user to req: %o', e);
    return next(e);
  }
}