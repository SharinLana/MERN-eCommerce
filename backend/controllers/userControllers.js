const User = require("../models/UserModel");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password").orFail(); // .select("-password") = exclude passwords

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { name, lastName, email, password } = req.body;

    if (!(name && lastName && email && password)) {
      res.send("Please provide all values");
    }

    const userExists = await User.findOne({ email }); // do not use .orFail() here!

    if (userExists) {
      res.status(400).json({
        error: `User with the email ${userExists.email} already exists`,
      });
    } else {
      const newUser = await User.create({
        name,
        lastName,
        email: email.toLowerCase(),
        password,
      });

      res.status(201).json({
        message: "User has been created!",
        newUser,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getUsers, registerUser };
