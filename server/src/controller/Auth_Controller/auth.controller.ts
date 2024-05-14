import { Request, Response, NextFunction } from "express";
import AuthService from "../../services/AuthServices/auth.service";
export class Base {
  protected AuthService: AuthService;
  constructor(authService: AuthService) {
    this.AuthService = authService;
  }
  index = async (req: Request, res: Response, next: NextFunction) => {
    return await this.AuthService.testing(req, res);
  };
}
