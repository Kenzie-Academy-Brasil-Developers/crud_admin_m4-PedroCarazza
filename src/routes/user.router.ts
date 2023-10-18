import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { createUserController, readAllUsersController, readCoursesByIdController } from "../controllers/user.controller";
import { userCreateSchema } from "../schemas/users.schema";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyEmail } from "../middlewares/verifyEmail.middleware";
import { userEnrolledInCourse } from "../middlewares/userEnrolledInCourse.midleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";

export const userRouter: Router = Router();

userRouter.post('/', validateBody(userCreateSchema), verifyEmail, createUserController);
userRouter.get('/', verifyToken, isAdmin, readAllUsersController)
userRouter.get('/:id/courses', verifyToken, isAdmin, userEnrolledInCourse, readCoursesByIdController)