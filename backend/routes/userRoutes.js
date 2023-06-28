const express = require("express");
const { getUsers, registerUser } = require("../controllers/userControllers");

const router = express.Router();

router.get("/", getUsers);
router.post("/register", registerUser);

module.exports = router;
