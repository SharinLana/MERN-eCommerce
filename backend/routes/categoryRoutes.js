const express = require("express");
const {
  getCategories,
  addCategory,
  deleteCategory,
  addAttribute,
} = require("../controllers/categoryControllers");

const router = express.Router();

router.get("/", getCategories);
router.post("/", addCategory);
router.delete("/:category", deleteCategory);
router.post("/attrs", addAttribute);

module.exports = router;
