const express = require("express");
const {
  getProducts,
  getProductById,
  getBestsellers,
  adminGetProducts,
  adminDeleteProduct,
  adminCreateProduct,
  adminUpdateProduct,
  adminFileUpload,
} = require("../controllers/productControllers");

const router = express.Router();

router.get("/category/:categoryName/search/:searchQuery", getProducts);
router.get("/category/:categoryName", getProducts);
router.get("/search/:searchQuery", getProducts);
router.get("/", getProducts);
router.get("/bestsellers", getBestsellers);
router.get("/get-one/:id", getProductById);

// Admin routes
router.get("/admin", adminGetProducts);
router.post("/admin", adminCreateProduct);
router.put("/admin/:id", adminUpdateProduct);
router.post("/admin/upload", adminFileUpload);
router.delete("/admin/:id", adminDeleteProduct);

module.exports = router;
