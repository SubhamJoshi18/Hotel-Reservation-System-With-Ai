import { ratings } from "./../../data/ratings";
import { check } from "express-validator";
import AppError from "../../Errors/AppError";
import HotelModel from "../../database/schema/Hotel_Schema/Hotel";
import Redis from "ioredis";
import mongoose from "mongoose";
import Review from "../../database/schema/Review/review";

const redis = new Redis();
class HotelServices {
  public async GetAllHotelServices(
    queryObject: {} | any
  ): Promise<any | object> {
    const { modPage, modLimit } = queryObject;
    const skip = (modPage - 1) * modLimit;
    const total = await HotelModel.find({}).countDocuments();
    const totalPage = Math.ceil(total / modLimit);
    if (total === 0) {
      throw new AppError("There Are No Hotels", 401);
    }
    const data = await HotelModel.find({})
      .populate({
        path: "Review",
        select: "-_id",
      })
      .skip(skip)
      .limit(modLimit);
    const cacheData = await redis.set(
      "hotel",
      JSON.stringify(data),
      "EX",
      3600
    );
    const makeResponse = {
      totalPage,
      data,
    };
    return makeResponse;
  }

  public async GetHotelByName(
    hotelName: string | undefined
  ): Promise<any | object> {
    const findHotel = await HotelModel.findOne({ name: hotelName }).populate({
      path: "Review",
      select: "-_id",
    });
    const countryName = "Nepal";
    if (!findHotel) {
      throw new AppError("Hotel Is Not Available Or Does Not Exists", 401);
    }
    const checkHotel = await HotelModel.findOne({
      $and: [
        {
          name: hotelName,
        },
        {
          country: countryName,
        },
      ],
    });

    return checkHotel;
  }

  public async GetHotelByRating(rating: number): Promise<any | object> {
    const rate = rating;
    console.log(rate);
    let emptyArray = [];
    for (let i = 0; i < ratings.length; i++) {
      if (typeof rating === "number" && rating === ratings[i]) {
        emptyArray.push(rating);
        break;
      }
    }
    if (emptyArray.length.toString().startsWith("0")) {
      throw new AppError(`${rate} Hotels Does Not Exists`, 401);
    }
    let Data: object | any;
    const countryName = "Nepal";
    const testing = await HotelModel.find({ rating: rate });
    Data =
      (await HotelModel.find({ rating: rate }).countDocuments()) > 0
        ? await HotelModel.find({ rating: rate }).populate({
            path: "Review",
            select: "-_id",
          })
        : `${rate} Hotel Are Not Available`;

    const responseData = {
      Data,
    };
    return responseData;
  }

  public async postReviewService(
    id: mongoose.Types.ObjectId | string | any,
    body: object | {} | any
  ): Promise<any | object> {
    const { feedback, suggestion }: { feedback: string; suggestion: string } =
      body;
    const existsHotel = await HotelModel.findOne({ _id: id });
    if (!existsHotel) {
      throw new AppError("Hotel Is Not Available", 401);
    }
    const checkIfReview = await Review.findOne({ Hotel: id });
    if (checkIfReview) {
      await Review.updateOne(
        {
          Hotel: id,
        },
        {
          $set: {
            feedback: feedback,
            suggestion: suggestion,
          },
        }
      );
      return "Review Updated";
    }

    const newReview = new Review({
      Hotel: id,
      feedback: feedback,
      suggestion: suggestion,
    });
    await newReview.save();
    return "Review Posted";
  }
}

export default HotelServices;
