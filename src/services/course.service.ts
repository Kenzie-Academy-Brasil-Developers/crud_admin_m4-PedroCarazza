import format from "pg-format";
import { Course, CourseCreate, CourseRead, CourseResult } from "../interfaces/course.interface";
import { client } from "../database";

export const createCourseService = async (data: CourseCreate): Promise<Course> => {
      
    const queryFormat: string = format(
      'INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;',
      Object.keys(data),
      Object.values(data)
    );
  
    const query: CourseResult = await client.query(queryFormat);
  
    return query.rows[0];
  };
  
export const readAllCoursesService = async (): Promise<CourseRead> => {
    const queryString: string = 'SELECT * FROM "courses";'

    const query = await client.query(queryString)
    
    return query.rows
}

export const enrollUserInCourseService = async (courseId: string, userId: string): Promise<void>  => {
    const queryString: string = `
    INSERT INTO "userCourses" ("courseId", "userId") VALUES ($1, $2) RETURNING *;
    `

    await client.query(queryString, [courseId, userId])

}

export const disableUserInCourseService = async (courseId: string, userId: string): Promise<void> => {
    const queryString: string = `
    UPDATE "userCourses" SET "active" = false WHERE "courseId" = $1 AND "userId" = $2;
    `

    await client.query(queryString, [courseId, userId])
}

export const readUsersinCourseService = async (courseId: string) => {
    const queryString: string = `
    SELECT 
    "uc"."userId" AS "userId",
    "u"."name" AS "userName",
    "uc"."courseId" AS "courseId",
    "c"."name" AS "courseName",
    "c"."description" AS "courseDescription",
    "uc"."active" AS "userActiveInCourse"
    FROM "userCourses" AS "uc"
    JOIN "users" AS "u"
        ON "uc"."userId" = "u"."id"
    JOIN "courses" AS "c"
        ON "uc"."courseId" = "c"."id"
    WHERE "uc"."id" = $1;
    `;

    const query = await client.query(queryString, [courseId]);

    return query.rows
}
