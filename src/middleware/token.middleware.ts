import { Request, Response, NextFunction } from 'express';
import { verify } from "jsonwebtoken";

import { ConstanceService } from '@services/consts.service';

export default function(req: Request, res: Response, next: NextFunction) {
    try {
        const jwtToken = req.cookies[ConstanceService.JWT_TOKEN_NAME]
        const userId = verify(jwtToken, ConstanceService.JWT_SECRET_KEY)
        res.locals.userId = userId
        next()
    } catch {
        res.sendStatus(401)
        return    
    }
}