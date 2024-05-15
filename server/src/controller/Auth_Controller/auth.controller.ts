import express, { NextFunction } from "express";
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
      sendResponse(
        res,
        201,
        `You have SuccessFully Registered In this App`,
        response
      );
    } catch (err: any | unknown) {
      console.log(err);
      next(err);
    }
  };

  login = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const body = req.body;
      const response = await this.AuthService.LoginService(body);
      sendResponse(
        res,
        201,
        `${response.user_name} Has Logged In SuccessFully`,
        response
      );
    } catch (err: any | unknown) {
      next(err);
    }
  };
}
