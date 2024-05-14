import { Router } from "express";
import { Base } from "../controller/Auth_Controller/auth.controller";
import * as User from "../database/schema/User_Schema/User";
import AuthService from "../services/AuthServices/auth.service";
import limiter from "../utils/rateLimiter";
const authRouter = Router();
const authService = AuthService;
class AuthRouter extends Base {
  usermodel: any;

  constructor(usermodel: any) {
    super(new authService());
    this.usermodel = User;

    authRouter.post("/auth", limiter, this.signup);
  }
}

new AuthRouter(User);
export default authRouter;
