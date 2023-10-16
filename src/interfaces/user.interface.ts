import { QueryResult } from "pg";
import { z } from "zod";
import { userCreateSchema, userReturnSchema, userSchema } from "../schemas/users.schema";

export type User = z.infer<typeof userSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserReturn = z.infer<typeof userReturnSchema>;
export type UserRead = User[];
export type UserResult = QueryResult<User>;