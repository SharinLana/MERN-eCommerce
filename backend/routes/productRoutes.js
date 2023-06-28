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
  adminDeleteProductImage,
} = require("../controllers/productControllers");
const { verifyIsLoggedIn } = require("../middleware/verifyAuthToken");

const router = express.Router();

router.get("/category/:categoryName/search/:searchQuery", getProducts);
router.get("/category/:categoryName", getProducts);
router.get("/search/:searchQuery", getProducts);
router.get("/", getProducts);
router.get("/bestsellers", getBestsellers);
router.get("/get-one/:id", getProductById);

// Admin routes
router.use(verifyIsLoggedIn); // checking cookies: if it exists or not
router.get("/admin", adminGetProducts);
router.post("/admin", adminCreateProduct);
router.put("/admin/:id", adminUpdateProduct);
router.post("/admin/upload", adminFileUpload);
router.delete("/admin/:id", adminDeleteProduct);
router.delete("/admin/image/:imagePath/:productId", adminDeleteProductImage);

module.exports = router;
