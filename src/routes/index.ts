import { Router } from "express";

import authRoute from "./auth.route";
import currentRoute from "./current.route";
import userRoute from "./user.route";
import forcastRoute from "./forcast.route";
import tokenMiddleware from "../middleware/token.middleware";

const router = Router()

router.use('/auth', authRoute)
router.use('/current', currentRoute)
router.use('/user', tokenMiddleware, userRoute)
router.use('/forcast', tokenMiddleware, forcastRoute)

export default router