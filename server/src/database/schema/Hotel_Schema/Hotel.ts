import mongoose from "mongoose";
import { FieldCannotBeEmpty } from "../../../helpers/schema/fieldNotEmpty";
import { MinExceed } from "../../../helpers/schema/minExceed";
const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, FieldCannotBeEmpty("Hotel Name")],
    min: [3, "Must be at least 6, got {VALUE}"],
    mx: [50, "Must be at least Greater than 50, got {VALUE"],
  },

  address: {
    type: String,
    required: [true, FieldCannotBeEmpty("Hotel Address")],
    min: [3, "Must be at least 6, got {VALUE}"],
    mx: [50, "Must be at least Greater than 50, got {VALUE"],
  },
  city: {
    type: String,
    required: [true, FieldCannotBeEmpty("City")],
    min: [3, "Must be at least 6, got {VALUE}"],
    mx: [50, "Must be at least Greater than 50, got {VALUE"],
  },
  state: {
    type: String,
    required: [true, FieldCannotBeEmpty("Zip Code")],
    min: [3, "Must be at least 6, got {VALUE}"],
    mx: [50, "Must be at least Greater than 50, got {VALUE"],
  },
  country: {
    type: String,
    required: [true, FieldCannotBeEmpty("country")],
    min: [3, "Must be at least 6, got {VALUE}"],
    mx: [50, "Must be at least Greater than 50, got {VALUE"],
  },
  phone_number: {
    type: String,
    required: [true, FieldCannotBeEmpty("Hotel Phone_Number")],
    min: [3, "Must be at least 6, got {VALUE}"],
    mx: [50, "Must be at least Greater than 50, got {VALUE"],
  },
  email: {
    type: String,
    required: [true, FieldCannotBeEmpty("Hotel Email")],
    min: [3, "Must be at least 6, got {VALUE}"],
    mx: [50, "Must be at least Greater than 50, got {VALUE"],
  },
  Website: {
    type: String,
    min: [3, "Must be at least 6, got {VALUE}"],
    mx: [50, "Must be at least Greater than 50, got {VALUE"],
  },
  rating: {
    type: Number,
    required: [true, FieldCannotBeEmpty("Hotel Rating")],
  },
  Review: {
    type: mongoose.Types.ObjectId,
    ref: "Review",
  },
});

const HotelModel = mongoose.model("hotels_name", hotelSchema);
export default HotelModel;
