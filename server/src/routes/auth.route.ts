import { Router } from "express";
import { Base } from "../controller/Auth_Controller/auth.controller";
import * as User from "../database/schema/User_Schema/User";
import AuthService from "../services/AuthServices/auth.service";
const authRouter = Router();
const authService = AuthService;
class AuthRouter extends Base {
  usermodel: any;

  constructor(usermodel: any) {
    super(new authService());
    this.usermodel = User;

    authRouter.get("/auth", this.index);
  }
}

new AuthRouter(User);
export default authRouter;
