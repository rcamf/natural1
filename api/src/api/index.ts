import { Router } from "express"
import auth from "./routes/auth";
import roll from "./routes/roll";
import game from "./routes/game";

export default () => {
  const app = Router();

  auth(app);
  game(app);
  roll(app);

  return app;
}