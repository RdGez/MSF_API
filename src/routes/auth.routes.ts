import { Router } from "express";
import { renewToken, signIn, signUp } from "../controllers/auth.controller";
import validateJWT from "../middlewares/jwt-validator";

const router = Router()

// Authentication User's Routes:
router.post('/', signIn)
router.post('/signup', signUp)
router.post('/renew', validateJWT, renewToken)

export default router