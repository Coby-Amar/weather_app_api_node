import { Router } from "express";

import { DBService } from "@services/db.service";

const router = Router()

router.get('/', async (req, res) => {
    const foundUser = await DBService.getUserById(res.locals.userId)
    if (!foundUser) {
        res.sendStatus(404)
        return
    }
    res.status(200).send({name: foundUser.name})
})

router.delete('/', async (req, res) => {
    try {
        await DBService.deleteUserAndForcastsById(res.locals.userId)
        res.sendStatus(204)
    } catch (error) {
        res.status(500).send(error)        
    }
})

export default router