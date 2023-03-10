import mongoose from "mongoose";
import { Db } from "mongodb";
import config from "../config";

export default async (): Promise<void> => {
  const connection = await mongoose.connect(config.mongo.mongoURI, {
    user: config.mongo.mongoUser,
    pass: config.mongo.mongoPassword,
    dbName: config.mongo.mongoDbName
  });
  connection.set('strictQuery', true);
};