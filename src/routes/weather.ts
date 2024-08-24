import { Router } from "express";
import { HttpService } from "../services/http.service";
import { body, validationResult, matchedData } from "express-validator";

const router = Router()

router.post('/', 
    body('lat').notEmpty().isNumeric().escape(),
    body('lon').notEmpty().isNumeric().escape(),
    async (req, res) => {
        if (!validationResult(req).isEmpty()) {
            res.sendStatus(400)
            return
        }
        const {lat, lon} = matchedData(req)
        const result = await HttpService.get('', { 
            params: {
                q: `${lat},${lon}`
            }
        })
        res.send(result.data)
})

export default router