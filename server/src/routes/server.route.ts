import express from "express";
import { Application } from "express-serve-static-core";
import authRouter from "./auth.route";
import AppError from "../Errors/AppError";
import hotelRouter from "./hotel.route";
import { errorHandler } from "../Errors/globalErrorHandler";

export const initRoutes = (expressApplication: Application) => {
  expressApplication.use("/api/", [authRouter, hotelRouter]);

  expressApplication.all("*", (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl}`, 404));
  });

  expressApplication.use(errorHandler);
};

export default initRoutes;
