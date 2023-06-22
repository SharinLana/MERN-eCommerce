const connectToDB = require("../db_config/db");
connectToDB();

const categoryData = require("./categories");
const Category = require("../models/CategoryModel");

const importData = async () => {
  try {
    await Category.collection.dropIndexes();
    await Category.collection.deleteMany({});
    await Category.insertMany(categoryData);
    console.log("Seeder data proceeded successfully");

    process.exit();
  } catch (error) {
    console.error("Error while proccessing seeder data", error);
    process.exit(1);
  }
};
importData();

// Then run "node seeder/seeder.js" to fill the DB with categories