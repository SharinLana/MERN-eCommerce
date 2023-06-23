const connectToDB = require("../db_config/db");
connectToDB();

const categoryData = require("./categories");
const productData = require("./products");
const reviewData = require("./reviews");
const userData = require("./users");
const Category = require("../models/CategoryModel");
const Product = require("../models/ProductModel");
const Review = require("../models/ReviewModel");
const User = require("../models/UserModel");

const importData = async () => {
  try {
    await Category.collection.dropIndexes();
    await Product.collection.dropIndexes();
    await Review.collection.dropIndexes();
    await User.collection.dropIndexes();

    await Category.collection.deleteMany({});
    await Product.collection.deleteMany({});
    await Review.collection.deleteMany({});
    await User.collection.deleteMany({});

    await Category.insertMany(categoryData);

    // fill the "reviews" property in the "products" DB collection
    // with the data from the "reviews" collection
    const reviews = await Review.insertMany(reviewData);
    const sampleProducts = productData.map((product) => {
      reviews.map((review) => {
        product.reviews.push(review._id);
      });
      return { ...product };
    });
    await Product.insertMany(sampleProducts);
    await User.insertMany(userData);

    console.log("Seeder data proceeded successfully");

    process.exit();
  } catch (error) {
    console.error("Error while proccessing seeder data", error);
    process.exit(1);
  }
};
importData();

// Then run "node seeder/seeder.js" to fill the DB with categories
