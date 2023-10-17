import { Router } from "express";
import { createCourseController, disableUserInCourseController, enrollUserInCourseController, readAllCoursesController, readUsersinCourseController } from "../controllers/course.controller";

export const courseRouter: Router = Router();

courseRouter.post('/', createCourseController )
courseRouter.post('/:courseId/users/:userId', enrollUserInCourseController)
courseRouter.get('/', readAllCoursesController)
courseRouter.get('/:id/users', readUsersinCourseController)
courseRouter.delete('/:courseId/users/:userId', disableUserInCourseController)

