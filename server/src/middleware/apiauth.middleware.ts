import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import AppError from "../Errors/AppError";
import envConfig from "../config/env.config";
import JwtService from "../services/JwtServices/jwt.service";

import userModel from "../database/schema/User_Schema/User";

interface IRequest extends Request {
  user?: any;
}

export const validateToken = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers["authorization"] as string;
  console.log(authToken);
  if (Object.keys(req.headers).length === 0) {
    next(new AppError("Header is Not Available", 401));
  }
  if (!authToken) {
    //paxi mero halne npm
    next(new AppError("No Authentication Token Provided", 402));
  }
  try {
    const jwtService = new JwtService();
    jwtService
      .verifyAccessToken(authToken)
      .then(async (decodedToken: string | any) => {
        if (!decodedToken) {
          return next(new AppError("Decoded Token Payload Failed", 401));
        }
        const checkUser = await userModel.findOne({
          _id: decodedToken.user_id,
        });
        if (checkUser?.username !== decodedToken.user_name) {
          return next(new AppError("Validation Failed", 401));
        }
        req.user = decodedToken;
        next();
      })
      .catch((error: Error | JsonWebTokenError) => {
        return next(new AppError(error.message, 403));
      });
  } catch (err: Error | any | unknown) {
    next(new AppError(err.message, 401));
  }
};
