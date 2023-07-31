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

const addAttribute = async (req, res, next) => {
  const { key, val, categoryChosen } = req.body;

  if (!key || !val || !categoryChosen) {
    return res.status(400).send("All inputs are required");
  }

  try {
    const category = categoryChosen.split("/")[0]; // in case the category has a / in the name: "Computers/Laptops"
    
    const categoryExists = await Category.findOne({ name: category }).orFail();
    if (categoryExists.attrs.length > 0) {
      // if key exists in the database then add a value to the key
      let keyDoesNotExistInDatabase = true;

      categoryExists.attrs.map((item, idx) => {
        if (item.key === key) {
          // let's say, we already have a "color" key in the attrs object
          keyDoesNotExistInDatabase = false;
          let copyAttributeValues = [...categoryExists.attrs[idx].value]; // then just take the array of this key values...
          copyAttributeValues.push(val); // ... and add a new value to it

          let newAttributeValues = [...new Set(copyAttributeValues)]; // Set ensures unique values, so we can't add "blue" twice
          categoryExists.attrs[idx].value = newAttributeValues;
        }
      });

      if (keyDoesNotExistInDatabase) {
        categoryExists.attrs.push({ key: key, value: [val] });
      }
    } else {
      // push the first object to the array
      categoryExists.attrs.push({ key: key, value: [val] });
    }

    await categoryExists.save();
    let cat = await Category.find({}).sort({ name: "asc" });
    
    return res.status(201).json({ categoryUpdated: cat });
  } catch (err) {
    next(err);
  }
};

module.exports = { getCategories, addCategory, deleteCategory, addAttribute };
