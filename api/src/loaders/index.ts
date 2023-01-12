import { Express } from "express";
import Logger from "./logger";
import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import dependencyInjectorLoader from "./dependencyInjector";
import { Db } from "mongodb";
import { models } from "./dbModels";

export default async (app: Express) => {
  await mongooseLoader();
  Logger.info("DB loaded and connected");

  await dependencyInjectorLoader(models)

  await expressLoader(app);
  Logger.info("Express loaded");
}