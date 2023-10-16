import { z } from "zod";
import { sessionSchema } from "../schemas/session.schema";
import { QueryResult } from "pg";

export type SessionCreate = z.infer<typeof sessionSchema>;
export type SessionResult = QueryResult<SessionCreate>;
export type SessionReturn = { token: string};