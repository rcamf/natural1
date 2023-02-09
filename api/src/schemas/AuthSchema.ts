import Joi from "joi";

export const SignupSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})