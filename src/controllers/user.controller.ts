import { Request, Response } from "express";
import { UserReadAll, UserReturn } from "../interfaces/user.interface";
import { createUserService, readAllUsersService, readCoursesByIdService } from "../services/user.service";


export const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const user: UserReturn = await createUserService(req.body);

    return res.status(201).json(user);
};

export const readAllUsersController = async (req: Request, res: Response): Promise<Response> => {
    const users: UserReadAll = await readAllUsersService();

    return res.status(200).json(users)
}

export const readCoursesByIdController = async (req: Request, res: Response): Promise<Response> => {
    const courses = await readCoursesByIdService(req.params.id);

    return res.status(200).json(courses);
}