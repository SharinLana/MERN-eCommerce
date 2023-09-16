require("dotenv").config();
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const apiRoutes = require("./routes/apiRoutes");
const connectDB = require("./db_config/db");

const app = express();
mongoose.set("strictQuery", true);

// Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

// Port
const httpServer = createServer(app);
global.io = new Server(httpServer);
const port = process.env.PORT || 5001;

// Routes middleware
app.use("/api", apiRoutes);

// Error middleware
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log(error);
  }
  next(error);
});

app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  } else {
    res.status(500).json({
      message: error.message,
    });
  }
});

const start = async () => {
  try {
    connectDB();
    httpServer.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
