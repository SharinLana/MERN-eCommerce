const express = require("express");
const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthToken");
const { getUserOrders } = require("../controllers/orderControllers");

const router = express.Router();

// user routes
router.use(verifyIsLoggedIn);

router.get("/", getUserOrders);

// Admin routes
router.use(verifyIsAdmin);

module.exports = router;
