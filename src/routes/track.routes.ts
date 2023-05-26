import { Router } from "express";
import { addTrack, deleteTrack, getTracks } from "../controllers/track.controller";
import validateJWT from "../middlewares/jwt-validator";

const router: Router = Router()

// Track's Routes:
router.get('/', validateJWT, getTracks)
router.post('/add', validateJWT, addTrack)
router.post('/delete', validateJWT, deleteTrack)

export default router