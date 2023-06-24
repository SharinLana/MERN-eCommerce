const Category = require("../models/CategoryModel");

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ name: "asc" }).orFail();

    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

const addCategory = async (req, res, next) => {
  try {
    const { category } = req.body;

    if (!category) {
      res.status(400).send("Category input is required");
    }

    const categoryExists = await Category.findOne({ name: category });
    if (categoryExists) {
      res.status(400).send("Category already exists!");
    } else {
      const newCategory = await Category.create({ name: category });
      res.status(201).json(newCategory);
    }
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    if (req.params.category !== "Choose category") {
      await Category.findOneAndDelete({
        name: decodeURIComponent(req.params.category), // decodeURIComponent needed to convert "Computers%2Laptops" into "Computers/Laptops"
      }).orFail();

      res.status(200).json({
        status: "success",
        message: "Category has been deleted",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getCategories, addCategory, deleteCategory };
