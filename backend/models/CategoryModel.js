const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category must have a name"],
    unique: [true, "Category name must be unique"],
  },
  description: {
    type: String,
    default: "default category description",
  },
  image: {
    type: String,
    default: "/images/tablets-category.png",
  },
  attrs: [{ key: { type: String }, value: [{ type: String }] }],
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
