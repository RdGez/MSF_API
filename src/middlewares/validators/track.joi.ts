import Joi from "joi";

export const trackJoi = Joi.object({
  user: Joi.string(),
  exercise: Joi.string(),
  weight: Joi.number().min(1),
  reps: Joi.number().min(1),
  sets: Joi.number().min(1)
})