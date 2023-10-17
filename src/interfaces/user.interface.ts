import { QueryResult } from "pg";
import { z } from "zod";
import { userCreateSchema, userReadAllSchema, userReadSchema, userReturnSchema, userSchema } from "../schemas/users.schema";

export type User = z.infer<typeof userSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserReturn = z.infer<typeof userReturnSchema>;
export type UserRead = z.infer<typeof userReadSchema>;
export type UserReadAll = z.infer<typeof userReadAllSchema>;
export type UserResult = QueryResult<User>;