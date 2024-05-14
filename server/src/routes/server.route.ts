import { Application } from "express-serve-static-core";
import authRouter from "./auth.route";

export const initRoutes = (expressApplication: Application) => {
  expressApplication.use("/api/", [authRouter]);
};

export default initRoutes;
