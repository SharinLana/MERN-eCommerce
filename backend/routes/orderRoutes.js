const express = require("express");
const getOrders = require("../controllers/orderControllers");

const router = express.Router();

router.get("/", getOrders);

module.exports = router;
