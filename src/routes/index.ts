import { Router } from "express";

import auth from "./auth";
import weather from "./weather";
import tokenMiddleware from "./middleware/token.middleware";
import { body, matchedData, validationResult } from "express-validator";
import { HttpService } from "../services/http.service";

const router = Router()

router.use('/auth', auth)
router.post('/current', 
    body('lat').notEmpty().isNumeric().escape(),
    body('lon').notEmpty().isNumeric().escape(),
    async (req, res) => {
        if (!validationResult(req).isEmpty()) {
            res.sendStatus(400)
            return
        }
        const {lat, lon} = matchedData(req)
        const result = await HttpService.get('../current.json', { 
            params: {
                q: `${lat},${lon}`
            }
        })
        res.send(result.data)
})
router.use(tokenMiddleware)
router.get('/ping', (_, res) => res.sendStatus(200))
router.use('/weather', weather)

export default router