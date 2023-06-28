const jwt = require("jsonwebtoken");

const verifyIsLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    // console.log(token)
    if (!token) {
      res.status(403).send("Access token is required for authentication");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next(); // must be called here to get to the next lines of codes
      // (which are route handlers in the productsRoutes.js)
    } catch (err) {
      return res.status(401).send("Unauthorized. Invalid token");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { verifyIsLoggedIn };
