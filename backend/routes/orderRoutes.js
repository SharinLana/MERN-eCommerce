const express = require("express");
const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthToken");
const {
  getUserOrders,
  getOrderDetails,
} = require("../controllers/orderControllers");

const router = express.Router();

// user routes
router.use(verifyIsLoggedIn);
router.get("/", getUserOrders);
router.get("/user/:orderId", getOrderDetails)

// Admin routes
router.use(verifyIsAdmin);

module.exports = router;
