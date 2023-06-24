const Product = require("../models/ProductModel");

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ name: 1 });

    res.status(200).json({
      status: "success",
      products,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProducts };
