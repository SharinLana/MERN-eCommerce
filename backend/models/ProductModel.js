const mongoose = require("mongoose");
const Review = require("./ReviewModel");

const imageSchema = new mongoose.Schema({
  path: {
    type: String,
    required: [true, "Please provide a path to the image"],
  },
});

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The product must have a name"],
      unique: [true, "The product name must be unique"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description for the product"],
    },
    category: {
      type: String,
      required: [true, "Please specify the product category"],
    },
    count: {
      type: Number,
      required: [true, "Please specify the product count"],
    },
    price: {
      type: Number,
      required: [true, "Please specify the product price"],
    },
    rating: {
      type: Number,
    },
    reviewsNumber: {
      type: Number,
    },
    sales: {
      type: Number,
      default: 0,
    },
    attrs: [
      { key: { type: String }, value: { type: String } },
      // [{ key: "color", value: "red" }, { key: "size", value: "1 TB" }]
    ],
    images: [imageSchema],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Review,
      },
    ],
  },
  {
    timestamps: true, //createdAt, deletedAt fields will be added automatically
  }
);

// Compound indexes to speed up the product search via search bar:
productSchema.index(
  { name: "text", description: "text" }, // find products by name and description
  { name: "TextIndex" } // find products only by name
);
// Sorting array elements in ascending order (a - z): find products by a specific key and sort them by value
// For descending order, use - 1
productSchema.index({ "attrs.key": 1, "attrs.value": 1 }); // attrs is an array, and we use numbers for arrays

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
