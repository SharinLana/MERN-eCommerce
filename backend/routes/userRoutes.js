const express = require("express");
const {
  getUsers,
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfileData,
} = require("../controllers/userControllers");
const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthToken");

const router = express.Router();

// Public routes
router.get("/", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);

// Logged in user routes
router.use(verifyIsLoggedIn);

router.post("/profile", updateUserProfile);
router.get("/profile/:id", getUserProfileData);

// Admin routes
router.use(verifyIsAdmin);

module.exports = router;
