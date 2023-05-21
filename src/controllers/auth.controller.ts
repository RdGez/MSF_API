import bcrypt from 'bcrypt';
import signJWT from '../utils/jwt-sign';
import User from '../models/User.entity';
import { Request, Response } from 'express'
import { loginJoi, signUpJoi } from '../middlewares/validators/auth.joi';

export const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  const validation = signUpJoi.validate(req.body)
  if (validation.error) {
    return res.status(400).json({
      ok: false,
      message: validation.error.message
    })
  }

  try {    
    const hasUser = await User.findOneBy({ email: email.toLowerCase() })
    if (hasUser) {
      return res.status(400).json({
        ok: false,
        message: 'Email already registered.'
      })
    }

    const user = new User()
    user.name = name
    const salt = bcrypt.genSaltSync()

    user.email = email.toLowerCase()
    user.password = bcrypt.hashSync(password, salt)
    await user.save()

    const token = await signJWT(user.id)
    return res.status(200).json({
      ok: true,
      token
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Error, plase try again in few seconds.'
    })
  }
}

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const validation = loginJoi.validate(req.body)
  if (validation.error) {
    return res.status(400).json({
      ok: false,
      message: validation.error.message
    })
  }

  try {
    const user = await User.findOneBy({ email: email.toLowerCase() })
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'User and/or password incorrect.'
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password as string || '')
    if(!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'User and/or password incorrect.'
      });
    }

    const token = await signJWT(user.id)
    return res.status(200).json({
      ok: true,
      token
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Error, plase try again in few seconds.'
    })
  }
}

export const renewToken = async (req: any, res: Response) => {
  const id = req.id
  const user = await User.findOneBy({ id })
  const token = await signJWT(id)

  if(!token || !user) {
    return res.status(401).json({
      ok: false,
      message: 'User not authenticated.'
    })
  }

  const { password, ...rest } = user

  return res.status(200).json({
    ok: true,
    token,
    user:rest,
  })
}
