const User = require("../models/UserModel");
const { hashPassword } = require("../utils/hashPassword");
const { generateAuthToken } = require("../utils/generateAuthToken");

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
    const cookieCredentials = {
      httpOnly: true, //for security reasons
      secure: process.env.NODE_ENV === "production", // effective after hosting on Versel or Render.com
      sameSite: "strict", // cookies won't be available for reaching from other websites
    };

    if (userExists) {
      res
        .status(400)
        .send(`User with the email ${userExists.email} already exists`);
    } else {
      const hashedPassword = hashPassword(password);
      const newUser = await User.create({
        name,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
      });

      res
        .cookie(
          "access token",
          generateAuthToken(
            newUser._id,
            newUser.name,
            newUser.lastName,
            newUser.email,
            newUser.isAdmin
          ),
          cookieCredentials
        )
        .status(201)
        .json({
          message: "User has been created!",
          // Exclude the password from the response data
          newUser: {
            _id: newUser._id,
            name: newUser.name,
            lastName: newUser.lastName,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
          },
        });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getUsers, registerUser };
