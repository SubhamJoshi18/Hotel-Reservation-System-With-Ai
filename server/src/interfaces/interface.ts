import mongoose from "mongoose";

export interface IPayload {
  user_id: mongoose.Types.ObjectId | string | any;
  user_name: string;
  user_country: string;
}
