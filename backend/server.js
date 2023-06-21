require("dotenv").config();
const express = require("express");

const app = express();

// Routes
const apiRoutes = require("./routes/apiRoutes");

const port = process.env.PORT || 3000;

app.use("/api", apiRoutes);

const start = async () => {
  app.listen(port, () => {
    console.log("Server listening on port " + port);
  });
};

start();
