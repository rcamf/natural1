import Joi from "joi";
import { _MongooseFindSchema } from "./_MongooseSchema";

export const FindRollsSchema = _MongooseFindSchema;

export const PushRollsSchema = Joi.object({
  messageId: Joi.string().required(),
  playerName: Joi.string().required(),
  description: Joi.string(),
  individualRolls: Joi.array().items(Joi.object({
    formula: Joi.string().required(),
    result: Joi.number().required(),
    rawResult: Joi.number().required(),
    label: Joi.string()
  }))
});

export const DeleteRollSchema = Joi.object({
  rollId: Joi.string().required()
});