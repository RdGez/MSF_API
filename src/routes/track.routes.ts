import { Router } from "express";
import { addTrack } from "../controllers/track.controller";

const router: Router = Router()

// Track's Routes:
router.post('/add', addTrack)

export default router