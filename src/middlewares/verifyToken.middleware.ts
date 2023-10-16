import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError.error";
import { verify } from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const {authorization} = req.headers

    if(!authorization){
        throw new AppError('Insufficient permission', 403)
    }

    const token = authorization.split(" "[1]);

    const decoded = verify(token.toString(), process.env.SECRET_KEY!)

    res.locals = {...res.locals, decoded}

    return next()


}