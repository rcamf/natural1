import { celebrate } from "celebrate";
import { NextFunction, Response, Router } from "express";
import Container from "typedi";
import winston from "winston";
import { IRequestWithToken, IRoll } from "../../interfaces";
import { DeleteRollSchema, FindRollsSchema, PushRollsSchema } from "../../schemas/RollSchema";
import RollService from "../../services/rollService";
import middlewares from "../middlewares";

export default (app: Router) => {
  const router = Router();
  app.use("/roll", router);

  router.post(
    "/findRolls",
    celebrate({
      body: FindRollsSchema
    }),
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: IRequestWithToken, res: Response, next: NextFunction) => {
      const logger = Container.get<winston.Logger>("logger");
      logger.debug("Endpoint with body: %o", req.body);
      try {
        const rollService = Container.get(RollService);
        const rolls = await rollService.findRolls(req.body.filter, req.body.projection, req.body.options, req.auth._id);
        return res.status(200).send({
          date: Date.now(),
          message: "All your rolls",
          data: rolls
        })
      } catch (error) {
        logger.error(error);
        next(error);
      }
    }
  )

  router.post(
    "/pushRolls",
    celebrate({
      body: PushRollsSchema
    }),
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: IRequestWithToken, res: Response, next: NextFunction) => {
      const logger = Container.get<winston.Logger>("logger");
      logger.debug("Endpoint with body: %o", req.body);
      try {
        const rollService = Container.get(RollService);
        req.body.rolls.forEach((roll: IRoll) => {
          roll.author = req.auth._id;
        })
        const rolls = await rollService.pushRolls(req.body.rolls);
        return res.status(201).send({
          date: Date.now(),
          message: "Rolls successfully pushed",
          data: rolls
        })
      } catch (error) {
        logger.error("Error: %o", error);
        next(error);
      }
    }
  )

  router.delete(
    "deleteRoll",
    celebrate({
      body: DeleteRollSchema
    }),
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: IRequestWithToken, res: Response, next: NextFunction) => {
      const logger = Container.get<winston.Logger>("logger");
      logger.debug("Endpoint with body: %o", req.body);
      try {
        const rollService = Container.get(RollService);
        if (await rollService.deleteRollById(req.body.rollId, req.auth._id)) {
          return res.status(204).end();
        }
        return res.status(400).send({
          date: Date.now(),
          message: "RollId not found"
        })
      } catch (error) {
        logger.error("Error: %o", error);
        next(error);
      }
    }
  )
}