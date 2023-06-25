const express = require("express");
const { getProducts } = require("../controllers/productControllers");

const router = express.Router();

router.get("/category/:categoryName", getProducts);
router.get("/", getProducts);

module.exports = router;
