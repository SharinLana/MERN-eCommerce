const jwt = require("jsonwebtoken");

// Params will come from the registerUser or loginUser controllers
const generateAuthToken = (_id, name, lastName, email, isAdmin) => {
  return jwt.sign(
    { _id, name, lastName, email, isAdmin }, // encode the user data an include it in the token
    process.env.JWT_SECRET_KEY, // include the secret key in the token
    { expiresIn: "7h" } // include the expiration date in the token
  );
};

module.exports = { generateAuthToken };
