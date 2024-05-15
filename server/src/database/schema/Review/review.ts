import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  feedback: {
    type: String,
    min: [3, "Must be at least 6, got {VALUE}"],
    mx: [500, "Must be at least Greater than 50, got {VALUE"],
  },
  suggestion: {
    type: String,
    min: [3, "Must be at least 6, got {VALUE}"],
    mx: [500, "Must be at least Greater than 50, got {VALUE"],
  },
  Hotel: {
    type: mongoose.Types.ObjectId,
    ref: "hotels+name",
  },
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
