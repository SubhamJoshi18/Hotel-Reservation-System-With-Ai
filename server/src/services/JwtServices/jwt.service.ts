import { IPayload } from "../../interfaces/interface";
import envConfig from "../../config/env.config";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../Errors/AppError";

class JwtService {
  constructor() {}

  public async createAccessToken(payloadData: IPayload): Promise<any> {
    const payload = payloadData;

    const secretKey = envConfig.accessToken_Key as string;
    const expirationTimeInSeconds = 24 * 60 * 60;

    const options: jwt.SignOptions = {
      issuer: "Intern Management System",
      expiresIn: expirationTimeInSeconds,
    };
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secretKey, options, (err, token) => {
        if (err) {
          reject("Token Invalid");
        } else {
          resolve(token);
        }
      });
    });
  }

  public async verifyAccessToken(token: string | any): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        envConfig.accessToken_Key as string,
        (err: any, payload: JwtPayload | any) => {
          if (err) {
            reject(err);
          } else {
            resolve(payload as JwtPayload);
          }
        }
      );
    });
  }
}

export default JwtService;
