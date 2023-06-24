const Product = require("../models/ProductModel");
const itemsPerPage = require("../utils/pagination");

const getProducts = async (req, res, next) => {
  try {
    const pageNum = Number(req.query.pageNum) || 1;

    const products = await Product.find({})
      .skip(itemsPerPage * (pageNum - 1))
      .limit(itemsPerPage);

    res.status(200).json({
      status: "success",
      products,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProducts };
