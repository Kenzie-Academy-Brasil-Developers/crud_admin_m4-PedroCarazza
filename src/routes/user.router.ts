import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { createUserController, readAllUsersController, readCoursesByIdController } from "../controllers/user.controller";
import { userCreateSchema } from "../schemas/users.schema";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyPermissions } from "../middlewares/verifyPermissions.middleware";
import { verifyEmail } from "../middlewares/verifyEmail.middleware";

export const userRouter: Router = Router();

userRouter.post('/', validateBody(userCreateSchema), verifyEmail, createUserController);
userRouter.get('/', verifyToken, readAllUsersController)
userRouter.get('/:id/courses', verifyToken, verifyPermissions, readCoursesByIdController)