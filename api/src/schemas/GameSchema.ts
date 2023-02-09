import Joi from "joi";
import { _MongooseFindSchema } from "./_MongooseSchema";

export const FindGamesSchema = _MongooseFindSchema;

export const CreateGameSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string()
})

export const DeleteGameSchema = Joi.object({
  gameId: Joi.string().required()
})