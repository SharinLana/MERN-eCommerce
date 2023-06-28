
const verifyIsLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies.access_token
    next(); // must be called here to get to the next lines of codes
    // (which are route handlers in the productsRoutes.js)
  } catch (err) {
    next(err);
  }
};

module.exports = { verifyIsLoggedIn };
