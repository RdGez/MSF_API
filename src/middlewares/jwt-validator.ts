import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';
import { IJwtPayload } from "../interfaces/jwt.interface";

const validateJWT = (req: any, res: Response, next: NextFunction) => {
  const token = req.header('token');

  if(!token) {
    return res.status(401).json({
      ok: false,
      message: 'Token has not provided.'
    });
  }

  try {
    const { id } = jwt.verify(token, `${process.env.JWT_SECRET}`) as IJwtPayload
    req.id = id;
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      message: 'User is not authenticated.'
    });
  }

  return next();
};

export default validateJWT;