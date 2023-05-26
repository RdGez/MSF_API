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

export const getTracks = async (req: any, res: Response) => {
  const id = req.id
  
  try {
    const tracker = await Track.find({ 
      relations: { user: false },
      where: { user: { id } },
    })

    return res.status(200).json({
      ok: true,
      tracker
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error, plase try again in few seconds.'
    }) 
  }
}

export const deleteTrack = async (req: any, res: Response) => {
  const userId = req.id
  const { id } = req.params

  try {
    const track = await Track.findOne({ 
      relations: { user: false }, 
      where: { id, user: { id: userId }}
    })
    if (!track) {
      return res.status(400).json({
        ok: false,
        message: 'Track not found.'
      })
    }

    await track.remove()

    return res.status(200).json({
      ok: true,
      message: 'Track deleted successfully.'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Error, plase try again in few seconds.'
    })
  }
}
