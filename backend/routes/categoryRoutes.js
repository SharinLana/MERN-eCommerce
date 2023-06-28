const express = require("express");
const {
  getCategories,
  addCategory,
  deleteCategory,
  addAttribute,
} = require("../controllers/categoryControllers");
const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthToken");

const router = express.Router();

router.get("/", getCategories);

// Available for admin only
router.use(verifyIsLoggedIn); // checking cookies: if it exists or not
router.use(verifyIsAdmin); // checking if the logged in user is Admin or not

router.post("/", addCategory);
router.delete("/:category", deleteCategory);
router.post("/attrs", addAttribute);

module.exports = router;
