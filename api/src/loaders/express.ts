import { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import corsOptions from "./cors";
import express from "express";
import config from "../config";
import routes from "../api";
import { errors, isCelebrateError } from "celebrate";
import Logger from "./logger";

export default (app: Express) => {
  app.get("/status", (req, res) => {
    res.status(200).end();
  });

  app.enable("trust proxy");

  app.use(cors(corsOptions))

  app.use(express.json({ limit: "50mb" }))

  app.use(config.setup.apiPrefix, routes());

  
  console.log(config.temp.signupPrefix)
  app.use(config.temp.signupPrefix, express.static("src/signup"))

  app.use((req, res, next) => {
    const err = new Error("Not Found") as any;
    err["status"] = 404;
    next(err);
  })

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.name === "UnauthorizedError") {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    if (isCelebrateError(err)) {
      Logger.error(err + " with details: \n%o", err.details);
    }
    return next(err);
  })

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    return res
      .status(err.status || 500)
      .send({
        errors: {
          message: err.message,
        },
      })
      .end();
  })
}