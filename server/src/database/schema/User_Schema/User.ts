import mongoose from "mongoose";
import { FieldCannotBeEmpty } from "../../../helpers/schema/fieldNotEmpty";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, FieldCannotBeEmpty("User Name")],
    min: [3, "Must be at least 6, got {VALUE}"],
    mx: [50, "Must be at least Greater than 50, got {VALUE"],
  },
  fullname: {
    type: String,
    required: [true, FieldCannotBeEmpty("Full Name")],
    min: [3, "Must be at least 6, got {VALUE}"],
    mx: [50, "Must be at least Greater than 50, got {VALUE"],
  },
  email: {
    type: String,
    required: [true, FieldCannotBeEmpty("Email ")],
    min: [3, "Must be at least 6, got {VALUE}"],
    mx: [50, "Must be at least Greater than 50, got {VALUE"],
  },
  Phone_Number: {
    type: String,
    required: [true, FieldCannotBeEmpty("Phone Number")],
    min: [3, "Must be at least 6, got {VALUE}"],
    mx: [50, "Must be at least Greater than 50, got {VALUE"],
  },
  Country: {
    type: String,
    required: [true, FieldCannotBeEmpty("Country")],
    min: [3, "Must be at least 6, got {VALUE}"],
    mx: [50, "Must be at least Greater than 50, got {VALUE"],
  },
  Hotel: {
    type: mongoose.Types.ObjectId,
    ref: "hotels_name",
  },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
