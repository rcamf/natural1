import { Container } from 'typedi';
import mongoose from 'mongoose';
import { IUser } from '../../interfaces/IUser';
import winston from 'winston';
import { NextFunction, Request, Response } from 'express';
import { IRequestWithToken } from '../../interfaces';

/**
 * Attach user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req: IRequestWithToken, res: Response, next: NextFunction) => {
  const Logger = Container.get<winston.Logger>('logger');
  try {
    const UserModel = Container.get('userModel') as mongoose.Model<IUser & mongoose.Document>;

    Logger.info("Requesting for: ", req.auth._id)
    const userRecord = await UserModel.findById(req.auth._id);

    if (!userRecord) {
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
};

export default attachCurrentUser;
