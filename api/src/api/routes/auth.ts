import { NextFunction, Request, Response, Router } from "express";
import Container from "typedi";
import winston from "winston";
import { IUserInputDTO } from "../../interfaces";
import AuthService from "../../services/authService";

export default (app: Router) => {
  const router = Router()
  app.use("/auth", router);

  router.post(
    "/signup",
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get<winston.Logger>("logger");
      logger.debug("Endpoint with body: %o", req.body)

      try {
        const authService = Container.get(AuthService)
        const { user, token } = await authService.signUp(req.body as IUserInputDTO);

        return res.status(201).json({ user, token });
      } catch (error) {
        logger.error("Error: %o", error);
        return next(error);
      }
    }
  )
}