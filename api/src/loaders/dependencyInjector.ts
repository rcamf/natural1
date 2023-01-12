import { Db } from "mongodb";
import Container from "typedi";
import LoggerInstance from "./logger";

export default (models: { name: string, model: any}[]) => {
  try {
    models.forEach(model => {
      Container.set(model.name, model.model);
    });

    Container.set("logger", LoggerInstance)
  } catch(err) {
    LoggerInstance.error("Error on dependency injetctor loader: %o", err)
    throw err;
  }
};