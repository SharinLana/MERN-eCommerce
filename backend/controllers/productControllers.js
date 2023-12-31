const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const Product = require("../models/ProductModel");
const itemsPerPage = require("../utils/pagination");
const imageValidate = require("../utils/validateImages");

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

    // Filtering products by attributes (RAM, color, etc)
    let attrsQueryCondition = [];
    if (req.query.attrs) {
      // attrs=RAM-1 TB-2 TB,color-blue-black => ["RAM-1 TB-2 TB", "color-blue-black", ""]

      attrsQueryCondition = req.query.attrs.split(",").reduce((acc, item) => {
        if (item) {
          let a = item.split("-"); // ["RAM", "1 TB", "2 TB"], ["color", "blue", "black"]
          let values = [...a]; // ["RAM", "1 TB", "2 TB"], ["color", "blue", "black"]
          values.shift(); // remove the first item from each array
          let a1 = {
            attrs: { $elemMatch: { key: a[0], value: { $in: values } } }, // {key: "RAM", value: ["1 TB", "2 TB"]}, {key: "color", value: ["blue", "black"]}
          };
          acc.push(a1);
          return acc;
        } else return acc;
      }, []);

      queryCondition = true;
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

    // Searching (search bar):
    const searchQuery = req.params.searchQuery || ""; // search/:searchQuery || ""
    let searchQueryCondition = {};
    let select = {}; // In general, which fields from DB I want to use for searching products

    if (searchQuery) {
      queryCondition = true;

      searchQueryCondition = { $text: { $search: searchQuery } }; // now it searches by the first matched word
      // if you need it to search by the PRECISE quote with spaces, use {$search: '"' + searchQuery + '"'}
      select = {
        score: { $meta: "textScore" }, // using "select", we can also add a new field to the DB.
        // In this case: if searchQuery is true, add field "score" to the DB.
        // The "score" field will reflect the RELEVANCE of the search
      };
      sort = { score: { $meta: "textScore" } }; // most relevant products will be displayed first.
    }

    if (queryCondition) {
      query = {
        $and: [
          priceQueryCondition,
          ratingQueryCondition,
          categoryQueryCondition,
          searchQueryCondition,
          ...attrsQueryCondition,
        ],
      };
    }

    const totalNumOfProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .select(select)
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

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("reviews") // attach all the reviews to the product
      .orFail();

    res.status(200).json({
      product,
    });
  } catch (err) {
    next(err);
  }
};

const getBestsellers = async (req, res, next) => {
  try {
    const bestsellers = await Product.aggregate([
      { $sort: { category: 1, sales: -1 } }, // sort by category (ascendant) and sales (highest first)
      {
        $group: { _id: "$category", doc_with_max_sales: { $first: "$$ROOT" } },
      },
      // { $match: { sales: { $gt: 0 } } },
      { $replaceWith: "$doc_with_max_sales" },
      { $project: { _id: 1, name: 1, images: 1, category: 1, description: 1 } }, // display only these fields
      { $limit: 3 }, // retrieve only 3 products
    ]);

    res.status(200).json({
      numOfBestsellers: bestsellers.length,
      bestsellers,
    });
  } catch (err) {
    next(err);
  }
};

const adminGetProducts = async (req, res, next) => {
  try {
    const products = await Product.find({})
      .sort({ category: 1 })
      .select("name price category");

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

const adminDeleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
    }).orFail();

    res.status(200).json({
      message: "product deleted",
    });
  } catch (err) {
    next(err);
  }
};

const adminCreateProduct = async (req, res, next) => {
  try {
    const product = new Product();

    const { name, description, count, price, category, attributesArray } =
      req.body;

    product.name = name;
    product.description = description;
    product.count = count;
    product.price = price;
    product.category = category;

    if (attributesArray.length > 0) {
      attributesArray.map((item) => {
        product.attrs.push(item);
      });
    }

    await product.save();

    res.status(201).json({
      message: "Product was successfully created",
      productId: product.id,
    });
  } catch (err) {
    next(err);
  }
};

const adminUpdateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    const { name, description, count, price, category, attributesArray } =
      req.body;

    product.name = name || product.name;
    product.description = description || product.description;
    product.count = count || product.count;
    product.price = price || product.price;
    product.category = category || product.category;

    if (attributesArray.length > 0) {
      product.attrs = [];
      attributesArray.map((item) => {
        product.attrs.push(item);
      });
    } else {
      product.attrs = [];
    }

    await product.save();

    res.status(200).json({
      message: "Product was successfully updated",
      product,
    });
  } catch (err) {
    next(err);
  }
};

const adminFileUpload = async (req, res, next) => {
  if (req.query.cloudinary === "true") {
    try {
      let product = await Product.findById(req.query.productId).orFail();
      product.images.push({ path: req.body.url });
      await product.save();
    } catch (err) {
      next(err);
    }
    return;
  }

  // work with form-data in Postman: images => file => upload a file
  try {
    if (!req.files || !req.files.images) {
      res.status(400).send("No files were uploaded");
    }

    const validateResult = imageValidate(req.files.images); // helper function
    if (validateResult.error) {
      return res.status(400).send(validateResult.error);
    }

    let imagesArray = [];
    // store the uploaded images on frontend:
    let uploadDirectory = path.resolve(
      __dirname,
      "../../frontend/",
      "public",
      "images",
      "products"
    );
    let product = await Product.findById(req.query.productId).orFail(); // /products/admin/upload?productId=6494f07d53d2960298a777b3

    // if 2 or more files were uploaded, then they will be saved as an array:
    if (Array.isArray(req.files.images)) {
      imagesArray = req.files.images;
    } else {
      imagesArray.push(req.files.images);
    }

    // change the names of the uploaded files to avoid receiving any damaging code inside of them.
    // for this purpose, use a uuid package generating random strings
    for (let image of imagesArray) {
      // console.log(path.extname(image.name)); // .png (or .jpg, or .jpeg)
      // console.log(uuidv4()); // random string
      let fileName = uuidv4() + path.extname(image.name);
      let uploadPath = uploadDirectory + "/" + fileName;

      // save the image path to the Product collection in the DB
      product.images.push({ path: "/images/products" + fileName });

      // move the uploaded image to the uploadPath
      // using the mv() method of the express-fileupload package:
      image.mv(uploadPath, function (err) {
        if (err) {
          return res
            .status(500)
            .send("Internal server error: " + err.message + err);
        }
      });
    }
    await product.save();

    return res.send("Files uploaded successfully!");
  } catch (err) {
    next(err);
  }
};

const adminDeleteProductImage = async (req, res, next) => {
  const imagePath = decodeURIComponent(req.params.imagePath);

  if (req.query.cloudinary === "true") {
    try {
      await Product.findOneAndUpdate(
        { _id: req.params.productId },
        { $pull: { images: { path: imagePath } } }
      ).orFail();
      return res.end();
    } catch (er) {
      next(er);
    }
    return;
  }
  // full path in Postman:
  // {{URL_eCommerce}}/products/admin/image/%2Fimages%2Fproducts%2F675a6eb7-c4e5-499c-8234-911cec22ab0a.jpg/6494f07d53d2960298a777b3
  try {
    // the path is encoded on the frontend as e.g. %2Fimages%2Fproducts%2F675a6eb7-c4e5-499c-8234-911cec22ab0a.jpg
    const finalPath = path.resolve("../frontend/public") + imagePath;

    fs.unlink(finalPath, function (err) {
      if (err) {
        return res
          .status(500)
          .send("Internal server error: " + err.message + err);
      }
    });

    await Product.findOneAndUpdate(
      { _id: req.params.productId },
      { $pull: { images: { path: imagePath } } }
    ).orFail();

    res.status(200).send("Image was deleted!");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getProductById,
  getBestsellers,
  adminGetProducts,
  adminDeleteProduct,
  adminCreateProduct,
  adminUpdateProduct,
  adminFileUpload,
  adminDeleteProductImage,
};
