const Product = require("../models/ProductModel");
const itemsPerPage = require("../utils/pagination");

const getProducts = async (req, res, next) => {
  try {
    // Filtering
    let query = {};
    let queryCondition = false;

    let priceQueryCondition = {};
    if (req.query.price) {
      queryCondition = true;
      query = { price: { $lte: Number(req.query.price) } };
    }

    let ratingQueryCondition = {};
    if (req.query.rating) {
      queryCondition = true;
      query = { rating: { $in: req.query.rating.split(",") } }; // input: rating: [3, 4, 5] (3 options marked ina row)
    }

    if (queryCondition) {
      query = {
        $and: [priceQueryCondition, ratingQueryCondition],
      };
    }

    // Pagination
    const pageNum = Number(req.query.pageNum) || 1;

    // Sort by name, price, etc
    let sort = {};
    const sortOption = req.query.sort || ""; // will come from the frontend SortingComponent (e.g. value="price_1", value="price_-1")

    if (sortOption) {
      let sortOpt = sortOption.split("_");
      sort = { [sortOpt[0]]: Number(sortOpt[1]) }; // (e.g.{ "price": 1}, or { "price": -1})
    }

    const totalNumOfProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .skip(itemsPerPage * (pageNum - 1))
      .sort(sort)
      .limit(itemsPerPage);

    res.status(200).json({
      status: "success",
      numOfPaginationButtons: Math.ceil(totalNumOfProducts / itemsPerPage),
      products,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProducts };
