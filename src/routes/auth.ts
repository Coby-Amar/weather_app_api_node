import { sign } from "jsonwebtoken";
import { Router } from "express";
import { v4 as uuidV4 } from "uuid";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import { body, validationResult, matchedData } from "express-validator";

import { DBService } from "../services/db.service";
import { ConstanceService } from "../services/consts.service";
import tokenMiddleware from "./middleware/token.middleware";

const router = Router()

router.post('/signup', 
    body('username').notEmpty().isEmail().escape(),
    body('password').notEmpty().isLength({max: 20}).isStrongPassword().escape(),
    (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            res.status(400).send('Username or Password is incorrect');
            return
        }
        const { username, password } = matchedData(req)
        const salt = genSaltSync()
        const hashedPasword = hashSync(password, salt)
        const useId = uuidV4() 
        DBService.addUser({
            id: useId,
            name: username,
            password: hashedPasword
        })
        const token = sign(useId, ConstanceService.JWT_SECRET_KEY)
        res.cookie(ConstanceService.JWT_TOKEN_NAME, token, {maxAge: ConstanceService.MAX_COOKIE_AGE, secure: ConstanceService.IS_PROD})
        res.sendStatus(201)
})
router.post('/login',
    body('username').notEmpty().isEmail().escape(),
    body('password').notEmpty().isStrongPassword().escape(),
    (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            res.status(400).send('Username or Password is incorrect');
            return
        }
        const { username, password } = matchedData(req)
        const foundUser = DBService.getUser(username)
        if (!foundUser) {
            res.status(400).send('Username or Password is incorrect');
            return
        }
        compareSync(password, foundUser.password)
        const token = sign(foundUser.id, ConstanceService.JWT_SECRET_KEY)
        res.cookie(ConstanceService.JWT_TOKEN_NAME, token, {maxAge: ConstanceService.MAX_COOKIE_AGE, secure: ConstanceService.IS_PROD})
        res.send('good')
    })
    router.post('/logout', tokenMiddleware, (req, res) => {
    res.cookie(ConstanceService.JWT_TOKEN_NAME, null, {maxAge: -1})
    res.sendStatus(200)
})

export default router