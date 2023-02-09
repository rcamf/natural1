import { celebrate } from "celebrate";
import { NextFunction, Response, Router } from "express";
import Container from "typedi";
import winston from "winston";
import { IGame, IRequestWithToken } from "../../interfaces";
import { CreateGameSchema, DeleteGameSchema, FindGamesSchema } from "../../schemas/GameSchema";
import GameService from "../../services/gameService";
import middlewares from "../middlewares";

export default (app: Router) => {
  const router = Router();
  app.use("/game", router);

  router.post(
    "/findGames",
    celebrate({
      body: FindGamesSchema
    }),
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: IRequestWithToken, res: Response, next: NextFunction) => {
      const logger = Container.get<winston.Logger>("logger");
      logger.debug("Endpoint with body: %o", req.body);
      try {
        const gameService = Container.get(GameService);
        const games = await gameService.findGames(req.body.filter, req.body.projection, req.body.options, req.auth._id);
        return res.status(200).send({
          date: Date.now(),
          message: "Games",
          data: games
        });
      } catch (error) {
        logger.error("Error: %o", error);
        next(error);
      }
    }
  )

  router.post(
    "/createGame",
    celebrate({
      body: CreateGameSchema
    }),
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req:IRequestWithToken, res: Response, next: NextFunction) => {
      const logger = Container.get<winston.Logger>("logger");
      logger.debug("Endpoint with body: %o", req.body);
      try {
        const gameService = Container.get(GameService);
        const newGame: IGame = {
          name: req.body.name,
          owner: req.auth._id,
          description: req.body.description,
          members: []
        }
        const createdGame = await gameService.createGame(newGame);
        return res.status(201).send({
          date: Date.now(),
          message: "Created new game",
          data: createdGame
        });
      } catch (error) {
        logger.error("Error: %o", error);
        next(error);
      }
    }
  )

  router.delete(
    "/deleteGame",
    celebrate({
      body: DeleteGameSchema
    }),
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: IRequestWithToken, res: Response, next: NextFunction) => {
      const logger = Container.get<winston.Logger>("logger");
      logger.debug("Endpoint with body: %o", req.body);
      try {
        
        const gameService = Container.get(GameService);
        if (await gameService.deleteGameById(req.body.gameId, req.auth._id)) {
          return res.status(204).end();
        }
        return res.status(400).send({
          date: Date.now(),
          message: "GameId not found"
        });
      } catch (error) {
        logger.error("Error: %o", error);
        next(error);
      }
    }
  )
}