import Joi from 'joi'

export const signUpJoi = Joi.object({
  name: Joi.string()
    .min(3),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(8)
    .required()
})

export const loginJoi = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required()
})