const jwt = require("jsonwebtoken");

// Params will come from the registerUser or loginUser controllers
const generateAuthToken = (_id, name, lastName, email, isAdmin) => {
  return jwt.sign(
    { _id, name, lastName, email, isAdmin }, // encode the user data an include it in the token
    process.env.JWT_SECRET_KEY, // include the secret key in the token
    { expiresIn: "7h" } // include the expiration date in the token
  );
};

// The result that includes the encoded user data (_id, name, lastName, email, isAdmin) + secret key + expiration date:
// access token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDljOTBjNzc0NzNmOWQ5NzhkNTQ3MGEiLCJuYW1lIjoiTWFyaWEiLCJsYXN0TmFtZSI6IlNoYXJpbiIsImVtYWlsIjoibWFyaWFAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY4Nzk4MjI3OSwiZXhwIjoxNjg4MDA3NDc5fQ.Bh4DHC5KVozkaGSBgXh5zvBRfGHM9gmHioYxhZX6Wsg;

module.exports = { generateAuthToken };
