import { Request, Response } from "express";
import { Course, CourseRead } from "../interfaces/course.interface";
import { createCourseService, disableUserInCourseService, enrollUserInCourseService, readAllCoursesService, readUsersinCourseService } from "../services/course.service";

export const createCourseController = async (req: Request, res: Response): Promise<Response> => {
    const course: Course = await createCourseService(req.body);

    return res.status(201).json(course);
}

export const readAllCoursesController = async (req: Request, res: Response): Promise<Response> => {
    const courses: CourseRead = await readAllCoursesService();

    return res.status(200).json(courses);
}

export const enrollUserInCourseController = async (req: Request, res: Response): Promise<Response> => {
    const {courseId, userId} = req.params;

    await enrollUserInCourseService(courseId, userId);

    return res.status(201).json({ message: 'User successfully vinculed to course'});
}

export const disableUserInCourseController = async (req: Request, res: Response): Promise<Response> => {
    const {courseId, userId} = req.params;

    await disableUserInCourseService(courseId, userId);

    return res.status(204).json();
}

export const readUsersinCourseController = async (req: Request, res: Response): Promise<Response> => {
    const {courseId} = req.params;

    const readUsersInCourse = await readUsersinCourseService(courseId);

    return res.status(200).json(readUsersInCourse);
}
