import { Router } from "express";
import { body, validationResult, matchedData } from "express-validator";

import { HttpService } from "@services/http.service";
import baddataMiddleware from "@middleware/baddata.middleware";
import { WeatherDetails, WeatherDetailsApi } from "$types/weather";
import { currentWeatherConverter } from "utils/weatherconverter.util";

const router = Router()

router.post('/', 
    body('lat').notEmpty().isNumeric().escape(),
    body('lon').notEmpty().isNumeric().escape(),
    baddataMiddleware,
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
        const data = result.data as WeatherDetailsApi
        res.send({
            location: data.location,
            current: currentWeatherConverter(data.current)
        } as WeatherDetails)
})

export default router