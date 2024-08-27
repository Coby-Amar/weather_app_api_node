import { Router } from "express";
import { body, matchedData, query } from "express-validator";

import { HttpService } from "@services/http.service";
import { DBService } from "@services/db.service";
import baddataMiddleware from "@middleware/baddata.middleware";
import { ForcastWeatherDetails, ForcastWeatherDetailsApi } from "$types/weather";
import { forcastWeatherConverter } from "utils/weatherconverter.util";

const router = Router()

router.get('/', async (req, res) => {
        const forcasts = await DBService.getUsersForcasts(res.locals.userId)
        res.send(forcasts)
})

router.get('/current', 
    query('lat').notEmpty().isNumeric().escape(),
    query('lon').notEmpty().isNumeric().escape(),
    baddataMiddleware,
    async (req, res) => {
        const {lat, lon} = matchedData(req)
        const { data } = await HttpService.get('', { 
            params: {
                q: `${lat},${lon}`
            }
        }) as { data: ForcastWeatherDetailsApi}
        const forcast:ForcastWeatherDetails = forcastWeatherConverter(data)
        res.send(forcast)
})

router.post('/', 
    body('lat').notEmpty().isNumeric().escape(),
    body('lon').notEmpty().isNumeric().escape(),
    baddataMiddleware,
    async (req, res) => {
        const {lat, lon} = matchedData(req)
        const { data } = await HttpService.get('', { 
            params: {
                q: `${lat},${lon}`
            }
        }) as { data: ForcastWeatherDetailsApi}
        const forcast:ForcastWeatherDetails = forcastWeatherConverter(data)
        DBService.addUserForcast(res.locals.userId, forcast)
        res.send(forcast)
})

export default router