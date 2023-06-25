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

    // Filtering products by category using the "All" button near the searchbar:
    let categoryQueryCondition = {};
    let categoryName = req.params.categoryName || ""; // req.params.categoryName came from the rout path: "/category/:categoryName"

    if (categoryName) {
      queryCondition = true;

      let a = categoryName.replaceAll(",", "/"); // if the category has a slash(es) (Computers/Laptops) it will appear in the route path as http://localhost:3000/api/products/category/Computers,Laptops.
      // To make the search in the DB correct, we need to replace that comma with a slash
      let regEx = new RegExp("^" + a); // and then find the match in the DB
      categoryQueryCondition = { category: regEx };
      // !To check the result in Postman, change the path from http://loalhost:3000/api/products
      // ! to http://localhost:3000/api/products/category/Computers,Laptops
    }

    // Filtering products by category using a sidebar checkboxes:
    if (req.query.category) {
      queryCondition = true;

      // If we select several categories using checkboxes,
      //  we'll get an array of them, splitted by commas.
      // So we need to map through this array to get each of the requested category from the DB
      let a = req.query.category.split(",").map((item) => {
        if (item) return new RegExp("^" + item);
      });
      // Overwrite the categoryQueryCondition
      categoryQueryCondition = { category: { $in: a } };
    }

    if (queryCondition) {
      query = {
        $and: [
          priceQueryCondition,
          ratingQueryCondition,
          categoryQueryCondition,
        ],
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
