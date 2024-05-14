import { Application } from "express";

import express from "express";

import cors from "cors";

export const initializeMiddleware = (expressApplication: Application): void => {
  expressApplication.use(cors());
  expressApplication.use(express.urlencoded({ extended: true }));
  expressApplication.use(express.json());
};
