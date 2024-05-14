import { Request, Response } from "express";
class AuthService {
  public async testing(req: Request, res: Response) {
    console.log("Hi reached here");
    return res.status(201).json("Hi");
  }
}

export default AuthService;
