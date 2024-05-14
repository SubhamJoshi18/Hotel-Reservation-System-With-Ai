import { Router } from "express";
const hotelRouter = Router();
import express from "express";
import { Redis } from "ioredis";

const redis = new Redis();

const checkCache = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const cacheData = await redis.get("cachedData");
  if (cacheData) {
    return res.status(201).json({
      message: "Redis db",
      data: JSON.parse(cacheData),
    });
  } else {
    next();
  }
};

hotelRouter.get(
  "/test",
  async (req: express.Request, res: express.Response) => {
    const cachedValue = await redis.get("cachedData");
    if (cachedValue) {
      return res.status(201).json({
        message: "Redis db",
        data: JSON.parse(cachedValue),
      });
    }
    const datatoBeCached = { message: "Hello World" };
    await redis.set("cachedData", JSON.stringify(datatoBeCached), "EX", 3600);
    return res.status(201).json({
      message: "Normal DB ",
      data: datatoBeCached,
    });
  }
);

export default hotelRouter;
