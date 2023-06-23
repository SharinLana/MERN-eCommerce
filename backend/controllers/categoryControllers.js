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

module.exports = getCategories;
