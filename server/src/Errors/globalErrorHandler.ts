import { NextFunction, Request, Response } from "express";
import { CustomError } from "../interfaces/customError";
import { statusConstant } from "../constants/statusConstant";
import { HTTPStatusCode } from "../constants/httpStatusCode";

const { InternalServerError } = HTTPStatusCode;
const { ERROR } = statusConstant;
export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.message, err.name);
  err.statusCode = err.statusCode || InternalServerError;
  err.status = err.status || ERROR;

  return res.status(err.statusCode).json({
    statuscode: err.statusCode,
    message: err.message,
    status: err.name,
  });
};
