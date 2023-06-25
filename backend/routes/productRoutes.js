const express = require("express");
const {
  getProducts,
  getProductById,
} = require("../controllers/productControllers");

const router = express.Router();

router.get("/category/:categoryName/search/:searchQuery", getProducts);
router.get("/category/:categoryName", getProducts);
router.get("/search/:searchQuery", getProducts);
router.get("/", getProducts);
router.get("/:id", getProductById);

module.exports = router;
