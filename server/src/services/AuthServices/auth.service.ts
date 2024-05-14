import express from "express";
import userModel from "../../database/schema/User_Schema/User";
import AppError from "../../Errors/AppError";
import countries from "../../data/countryData";
import bcryptjs from "bcrypt";

interface Iuser {
  username: string;
  fullname: string;
  email: string;
  password: string;
  Phone_Number: string;
  Country: string;
}
class AuthService {
  public async RegsiterServices(body: any): Promise<any> {
    const {
      username,
      fullname,
      email,
      password,
      Phone_Number,
      Country,
    }: Iuser = body;
    const existUsername = await userModel
      .findOne({ username: username })
      .countDocuments();
    if (existUsername.toString().startsWith("1")) {
      throw new AppError(
        `${username} Already Exists Please Try Another One`,
        401
      );
    }
    const validity: Array<string> = ["valid", "invalid"];
    const checkCountry = countries.includes(Country)
      ? validity[0]
      : validity[1];
    if (checkCountry.startsWith("in")) {
      throw new AppError(`${Country} Does Not Exists`, 401);
    }

    const checkPhoneNumber = Phone_Number.toString().startsWith("98")
      ? true
      : false;
    if (!checkPhoneNumber) {
      throw new AppError(
        `${Phone_Number} Does not Work In This Country , The Number Should Start From +977 98`,
        401
      );
    }
    const genSalt = await bcryptjs.genSalt(10);
    const hashPass = await bcryptjs.hash(password, genSalt);
    const newRegistered = new userModel({
      username: username,
      fullname: fullname,
      email: email,
      password: hashPass,
      Phone_Number: Phone_Number,
      Country: Country,
    });
    await newRegistered.save();
    const message = "User Registered SuccessFully";
    return message;
  }
}
export default AuthService;
