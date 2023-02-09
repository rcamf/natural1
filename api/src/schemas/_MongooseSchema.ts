import { Joi } from "celebrate";

export const _MongooseFindSchema = Joi.object({
  filter: Joi.object().required(),
  projection: Joi.object().required(),
  options: Joi.object().required()
});