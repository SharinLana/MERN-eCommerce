const User = require("../models/UserModel");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password").orFail(); // .select("-password") = exclude passwords

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = { getUsers };
