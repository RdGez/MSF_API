import { Response } from "express"
import { makeModel } from "../helpers/make-model.helper"
import { trackJoi } from "../middlewares/validators/track.joi"
import { joiErrors } from "../helpers/joi-errors.helper"

import Track from "../models/Track.entity"
import Exercise from "../models/Exercise.entity"

export const addTrack = async (req: any, res: Response) => {
  const user = req.id
  const { exercise } = req.body

  const validation = trackJoi.validate(req.body)
  if (validation.error) {
    return res.status(400).json({
      ok: false,
      message: joiErrors(validation.error)
    })
  }

  try {
    console.log('Exercise:', exercise)
    const hasExercise = await Exercise.findOneBy({ id: exercise })
    if (!hasExercise) {
      return res.status(400).json({
        ok: false,
        message: 'Exercise not found.'
      })
    }

    const track = makeModel<Track>(Track, { user, ...req.body })
    const trackDB = await track.save()

    return res.status(200).json({
      ok: true,
      track: trackDB
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error, plase try again in few seconds.'
    })
  }
}