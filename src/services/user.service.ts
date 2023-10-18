import { hash } from "bcryptjs";
import format from "pg-format";
import {UserCreate, UserResult, UserReturn} from "../interfaces/user.interface";
import { client } from "../database";
import { userReadAllSchema, userReturnSchema } from "../schemas/users.schema";
import AppError from "../errors/AppError.error";

export const createUserService = async (
  data: UserCreate
): Promise<UserReturn> => {
  data.password = await hash(data.password, 10);

  const queryFormat: string = format(
    'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
    Object.keys(data),
    Object.values(data)
  );

  const query: UserResult = await client.query(queryFormat);

  return userReturnSchema.parse(query.rows[0]);
};

export const readAllUsersService = async () => {
  const queryString: string = 'SELECT * FROM "users";';

  const query = await client.query(queryString);

  return userReadAllSchema.parse(query.rows);
};

export const readCoursesByIdService = async (userId: string) => {
  const queryString: string = `
    SELECT
    "c"."id" AS "courseId",
    "c"."name" AS "courseName",
    "c"."description" AS "courseDescription",
    "uc"."active" AS "userActiveInCourse",
    "uc"."userId",
    "u"."name" AS "userName"
    FROM "courses" AS "c"
    JOIN "userCourses" AS "uc"
        ON "c"."id" = "uc"."courseId"
    JOIN "users" AS "u"
        ON "u"."id" = "uc"."userId"
    WHERE "u"."id" = $1; 
    `;

  const queryResult: UserResult = await client.query(queryString, [userId]);

  if (!queryResult.rowCount) {
    throw new AppError("No courses linked to this user", 404);
  }

  return queryResult.rows;
};
