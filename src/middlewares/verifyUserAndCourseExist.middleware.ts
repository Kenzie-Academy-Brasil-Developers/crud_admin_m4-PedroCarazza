import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError.error";
import { UserResult } from "../interfaces/user.interface";
import { client } from "../database";

export const verifyUserAndCourseExist = async (req: Request, res: Response, next: NextFunction): Promise <void> => {
    const {courseId, userId} = req.params
    
    const queryUser: string = 'SELECT * FROM "users" WHERE "id" = $1;';
    const queryResultUser: UserResult = await client.query(queryUser, [userId])

    const queryCourse: string = 'SELECT * FROM "courses" WHERE "id" = $1;';
    const queryResultCourse: UserResult = await client.query(queryCourse, [courseId])

    if(!queryResultUser.rowCount || !queryResultCourse.rowCount){
        throw new AppError('User/course not found', 404)
    }

    return next()
}