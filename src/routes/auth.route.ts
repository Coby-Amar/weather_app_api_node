import { sign } from "jsonwebtoken";
import { CookieOptions, Router } from "express";
import { v4 as uuidV4 } from "uuid";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import { body, validationResult, matchedData } from "express-validator";

import { DBService } from "@services/db.service";
import { ConstanceService } from "@services/consts.service";
import tokenMiddleware from "@middleware/token.middleware";
import baddataMiddleware from "@middleware/baddata.middleware";

const router = Router()

const cookieOptions: CookieOptions = {
    maxAge: ConstanceService.MAX_COOKIE_AGE,
    secure: ConstanceService.IS_PROD,
    sameSite: ConstanceService.IS_PROD ? 'strict' : 'none',
    httpOnly:true,
}

router.post('/signup', 
    body('username').isString().trim().notEmpty().isEmail().escape(),
    body('password').isString().trim().notEmpty().isLength({max: 20}).isStrongPassword().escape(),
    baddataMiddleware,
    (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            res.status(400).send('Username or Password is incorrect');
            return
        }
        const { username, password } = matchedData(req)
        const salt = genSaltSync()
        const hashedPasword = hashSync(password, salt)
        const userId = uuidV4()
        const name = (username as string).replace(/@.*/g, '')  
        DBService.addUser({
            id: userId,
            name,
            username,
            password: hashedPasword
        })
        const token = sign(userId, ConstanceService.JWT_SECRET_KEY)
        res.cookie(ConstanceService.JWT_TOKEN_NAME, token, cookieOptions)
        .status(201)
        .send({name})
})
router.post('/login',
    body('username').isString().trim().notEmpty().isEmail().escape(),
    body('password').isString().trim().notEmpty().isLength({ min: 4, max: 20}).isStrongPassword().escape(),
    baddataMiddleware,
    async (req, res) => {
        const { username, password } = matchedData(req)
        const foundUser = await DBService.getUser(username)
        if (!foundUser) {
            res.status(400).send('Username or Password is incorrect');
            return
        }
        compareSync(password, foundUser.password)
        const token = sign(foundUser.id, ConstanceService.JWT_SECRET_KEY)
        res.cookie(ConstanceService.JWT_TOKEN_NAME, token, cookieOptions)
        .status(200)
        .send({ name: foundUser.name})
    }
)
router.post('/logout', tokenMiddleware, (req, res) => {
    res.cookie(ConstanceService.JWT_TOKEN_NAME, null, {maxAge: -1})
    .sendStatus(200)
})

export default router