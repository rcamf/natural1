import { celebrate } from "celebrate";
import { NextFunction, Request, Response, Router } from "express";
import Container from "typedi";
import winston from "winston";
import { IRequestWithToken } from "../../interfaces";
import { LoginSchema, SignupSchema } from "../../schemas/AuthSchema";
import AuthService from "../../services/authService";

export default (app: Router) => {
  const router = Router()
  app.use("/auth", router);

  router.post(
    "/signup",
    celebrate({
      body: SignupSchema
    }),
    async (req: IRequestWithToken, res: Response, next: NextFunction) => {
      const logger = Container.get<winston.Logger>("logger");
      logger.debug("Endpoint with body: %o", req.body);

      try {
        const authService = Container.get(AuthService)
        req.body.isAdmin = false
        const { user, token } = await authService.signUp(req.body);

        return res.status(201).json({ user, token });
      } catch (error) {
        logger.error("Error: %o", error);
        return next(error);
      }
    }
  )

  router.post(
    "/signin",
    celebrate({
      body: LoginSchema
    }),
    async (req: IRequestWithToken, res: Response, next: NextFunction) => {
      const logger = Container.get<winston.Logger>("logger");
      logger.debug("Endpoint with body: %o", req.body);
      try {
        const { email, password } = req.body;
        const authService = Container.get(AuthService);
        const { user, token } = await authService.signIn(email, password);
        return res.status(200).json({
          user: user,
          token: token
        });
      } catch (error) {
        logger.error("Error: %o", error);
        error.status = 403;
        return next(error);
      }
    }
  )
}