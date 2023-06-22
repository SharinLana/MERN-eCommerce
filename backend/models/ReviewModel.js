const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "Please write a comment"],
    },
    rating: {
      type: Number,
      required: [true, "Please rate the product"],
    },
    user: {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      name: { type: String, required: [true, "Please provide the user name"] },
    },
  },
  {
    timestamps: true, //createdAt, deletedAt fields will be added automatically
  }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
