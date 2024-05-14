import express from "express";
import AuthService from "../../services/AuthServices/auth.service";
import { registerSchema } from "../../validation/authValidation";
import { sendResponse } from "../../helpers/response/customResponse";

export class Base {
  protected AuthService: AuthService;
  constructor(authService: AuthService) {
    this.AuthService = authService;
  }

  signup = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const body = req.body;
      const response = await this.AuthService.RegsiterServices(body);
      sendResponse(res, 201, "Testing Message", response);
    } catch (err: any | unknown) {
      console.log(err);
      next(err);
    }
  };
}
