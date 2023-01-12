import { randomBytes } from "crypto";
import { Inject, Service } from "typedi";
import { Logger } from "winston";
import { IUser, IUserInputDTO } from "../interfaces";
import argon2 from "argon2";
import userModel from "../models/user";
import jwt from "jsonwebtoken";
import configObject from "../config";

@Service()
export default class AuthService {
  constructor(
    @Inject("logger") private logger: Logger
  ) { }

  public async signUp(newUser: IUserInputDTO): Promise<{ user: IUser; token: string }> {
    try {
      const salt = randomBytes(32);
      const saltHex = salt.toString("hex");
      const passwordHash = await argon2.hash(newUser.password, { salt });
      const createdUser = {
        ...newUser,
        salt: saltHex,
        password: passwordHash
      };
      const userDoc = await userModel.create(createdUser);
      const token = this.generateToken(userDoc);
      
      const user = userDoc.toObject<IUser>();
      Reflect.deleteProperty(user, "password");
      Reflect.deleteProperty(user, "salt")

      return { user, token }
    } catch (error) {
      this.logger.error(error);
    }
  }

  private generateToken(user: IUser) {
    const now = Date.now()
    return jwt.sign({
      _id: user._id,
      exp: now / 1000 + 86400
    }, configObject.setup.jwtSecret);
  }
}