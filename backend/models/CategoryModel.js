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

// Compound index to speed up the search for a category in the DB:
categorySchema.index({ description: 1 }); // categories sorted alphabetically in the DB (a - z)

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
