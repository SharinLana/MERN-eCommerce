require("dotenv").config();
const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("MONGODB connected!"));
  } catch (error) {
    console.log("MongoDB Connection FAIL! ", error);
    process.exit(1);
  }
};

module.exports = connectToDB;
