import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export default function(req: Request, res: Response, next: NextFunction) {
    if (!validationResult(req).isEmpty()) {
        res.sendStatus(400)
        return
    }
    next()
}