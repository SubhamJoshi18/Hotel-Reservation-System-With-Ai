import express from "express";
import { Redis } from "ioredis";
import { query } from "express-validator";
import HotelModel from "../database/schema/Hotel_Schema/Hotel";
import { Router } from "express";
import HotelServices from "../services/HotelServices/hotel.service";
import HotelController from "../controller/Hotel_Controller/hotel.controller";
import limiter from "../utils/rateLimiter";
import { checkCache } from "../middleware/redis.middleware";
const redis = new Redis();
const hotelRouter = Router();

class HotelRouter extends HotelController {
  hotelmodel: any;
  constructor(hotelModel: any) {
    super(new HotelServices());
    this.hotelmodel = HotelModel;

    hotelRouter.get(
      "/hotels",
      limiter,
      query("page").exists(),
      query("limit").exists(),
      checkCache,
      this.GetAllHotels
    );

    hotelRouter.get(
      "/hotel/name",
      limiter,
      query("name").exists(),
      this.GetHotelByName
    );

    hotelRouter.get(
      "/hotel/rating",
      limiter,
      query("rating").equals("rating").exists(),
      this.GetHotelByRating
    );

    //Reviews
    hotelRouter.post(
      "/hotel/reviews",
      limiter,
      query("id").equals("id"),
      this.PostReview
    );
  }
}

new HotelRouter(HotelModel);
export default hotelRouter;
