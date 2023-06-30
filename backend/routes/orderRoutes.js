const express = require("express");
const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthToken");
const {
  getUserOrders,
  getOrderDetails,
  createOrder,
  updateOrderToPaid,
} = require("../controllers/orderControllers");

const router = express.Router();

// user routes
router.use(verifyIsLoggedIn);
router.get("/", getUserOrders);
router.get("/user/:orderId", getOrderDetails);
router.post("/", createOrder);
router.put("/paid/:id", updateOrderToPaid);

// Admin routes
router.use(verifyIsAdmin);

module.exports = router;
