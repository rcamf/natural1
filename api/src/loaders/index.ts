import { Express } from "express";
import Logger from "./logger";
import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import dependencyInjectorLoader from "./dependencyInjector";
import { Db } from "mongodb";

export default async (app: Express) => {
  const mongoDatabase: Db = await mongooseLoader();
  Logger.info("DB loaded and connected");

  await dependencyInjectorLoader({
    mongoDatabase,
    models: models
  })

  await expressLoader(app);
  Logger.info("Express loaded");
}