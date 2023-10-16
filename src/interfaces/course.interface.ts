import { QueryResult } from "pg";
import { z } from "zod";
import { courseCreateSchema, courseSchema } from "../schemas/courses.schema";

export type Course = z.infer<typeof courseSchema>;

export type CourseCreate = z.infer<typeof courseCreateSchema>;
export type CourseRead = Course[];
export type CourseResult = QueryResult<Course>;