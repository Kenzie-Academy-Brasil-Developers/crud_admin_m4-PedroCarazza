import { Router } from "express";
import { createCourseController, disableUserInCourseController, enrollUserInCourseController, readAllCoursesController, readUsersinCourseController } from "../controllers/course.controller";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { validateBody } from "../middlewares/validateBody.middleware";
import { courseCreateSchema } from "../schemas/courses.schema";
import { verifyUserAndCourseExist } from "../middlewares/verifyUserAndCourseExist.middleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";

export const courseRouter: Router = Router();

courseRouter.post('/', validateBody(courseCreateSchema), verifyToken, isAdmin, createCourseController )
courseRouter.post('/:courseId/users/:userId', verifyToken, isAdmin, verifyUserAndCourseExist, enrollUserInCourseController)
courseRouter.get('/', readAllCoursesController)
courseRouter.get('/:courseId/users', verifyToken, isAdmin, readUsersinCourseController)
courseRouter.delete('/:courseId/users/:userId', verifyToken, isAdmin, verifyUserAndCourseExist, disableUserInCourseController)

