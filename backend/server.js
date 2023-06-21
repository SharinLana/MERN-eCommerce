require("dotenv").config();
const express = require("express");
// Routes
const apiRoutes = require("./routes/apiRoutes");

const app = express();

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
  app.listen(port, () => {
    console.log("Server listening on port " + port);
  });
};

start();
