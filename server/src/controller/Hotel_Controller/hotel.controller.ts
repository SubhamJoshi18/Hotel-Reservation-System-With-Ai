import express from "express";
import HotelServices from "../../services/HotelServices/hotel.service";
import { sendResponse } from "../../helpers/response/customResponse";
import AppError from "../../Errors/AppError";
class HotelController {
  protected hotelService: HotelServices;
  constructor(hotelService: HotelServices) {
    this.hotelService = hotelService;
  }

  GetAllHotels = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      console.log(req.query);
      const modPage = Number(req.query.page) ? Number(req.query.page) : 1;
      const modLimit = Number(req.query.limit) ? Number(req.query.limit) : 3;
      const queryObject = {
        modPage,
        modLimit,
      };
      const response = await this.hotelService.GetAllHotelServices(queryObject);
      sendResponse(res, 201, "MongoDB Database", response);
    } catch (err: any | unknown) {
      next(err);
    }
  };

  GetHotelByName = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const hotelName =
        typeof req.query.name === "string" ? req.query.name : undefined;
      if (hotelName === undefined) {
        next(new AppError("Name is Not Valid String", 401));
      }
      const response = await this.hotelService.GetHotelByName(hotelName);
      return sendResponse(res, 201, "Requested Hotel", response);
    } catch (err: any | unknown) {
      next(err);
    }
  };

  GetHotelByRating = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const query = Number(req.query.rating);
      const response: string | object =
        await this.hotelService.GetHotelByRating(query);
      return sendResponse(res, 201, `${query} Rating Hotels`, response);
    } catch (err: any | unknown) {
      next(err);
    }
  };

  PostReview = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const hotelId = req.query.id;
      const body = req.body;
      const response: string = await this.hotelService.postReviewService(
        hotelId,
        body
      );
      return sendResponse(res, 201, "Review", response);
    } catch (err: any | unknown) {
      next(err);
    }
  };
}

export default HotelController;
