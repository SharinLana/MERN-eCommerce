require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const fileUpload = require("express-fileupload");
const apiRoutes = require("./routes/apiRoutes");
const connectDB = require("./db_config/db");

const app = express();
mongoose.set("strictQuery", true);

// Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload);

// Port
const port = process.env.PORT || 3000;

// Routes middleware
app.use("/api", apiRoutes);

// Error middleware
app.use((error, req, res, next) => {
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
});

const start = async () => {
  try {
    connectDB();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
