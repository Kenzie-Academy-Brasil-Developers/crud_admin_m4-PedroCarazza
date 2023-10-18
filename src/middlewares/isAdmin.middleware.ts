import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError.error";

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
    
const { decoded } = res.locals;

  if (!decoded.admin) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};
