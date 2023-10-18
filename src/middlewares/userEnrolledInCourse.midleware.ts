import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import AppError from "../errors/AppError.error";

export const userEnrolledInCourse = async (req: Request, res: Response, next: NextFunction): Promise <void> => {
    const {id} = req.params

    const query: string = 'SELECT * FROM "userCourses" WHERE "userId" = $1;'

    const queryResult = await client.query(query, [id])

    if(!queryResult.rowCount){
        throw new AppError('No course found', 404)
    }

    return next();
}