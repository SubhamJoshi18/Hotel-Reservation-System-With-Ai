import { Redis } from "ioredis";
import express from "express";
import { sendResponse } from "../helpers/response/customResponse";
const redis = new Redis();

export const checkCache = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const cacheData = await redis.get("hotel");
  if (cacheData) {
    return sendResponse(res, 201, "Redis Cache Data", JSON.parse(cacheData));
  } else {
    next();
  }
};
