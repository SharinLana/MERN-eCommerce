const jwt = require("jsonwebtoken");

const verifyIsLoggedIn = async (req, res, next) => {
  next();
  return; //* to do: remove later
  try {
    const token = req.cookies.access_token;
    // console.log(token)
    if (!token) {
      res
        .status(403)
        .send("Access token is required for authentication. Please log in");
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

const verifyIsAdmin = (req, res, next) => {
  next();
  return; //* to do: remove later
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Unauthorized. Not an admin");
  }
};

module.exports = { verifyIsLoggedIn, verifyIsAdmin };
