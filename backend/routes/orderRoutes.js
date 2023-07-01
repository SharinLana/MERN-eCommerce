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
  updateOrderToBeDelivered,
  adminGetAllOrders,
  getOrderForAnalysis,
} = require("../controllers/orderControllers");

const router = express.Router();

// user routes
router.use(verifyIsLoggedIn);
router.get("/", getUserOrders);
router.get("/user/:orderId", getOrderDetails);
router.post("/", createOrder);
router.put("/paid/:orderId", updateOrderToPaid);

// Admin routes
router.use(verifyIsAdmin);
router.put("/delivered/:orderId", updateOrderToBeDelivered);
router.get("/admin", adminGetAllOrders);
router.get("/analysis/:date", getOrderForAnalysis);

module.exports = router;
