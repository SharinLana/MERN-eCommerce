const User = require("../models/UserModel");
const { hashPassword, comparePasswords } = require("../utils/hashPassword");
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
    let cookieCredentials = {
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

const loginUser = async (req, res, next) => {
  try {
    const { email, password, doNotLogout } = req.body; // doNotLogout is an optional parameter and can be true or false depending on wether the checkbox on the frontend wes checked or not

    if (!(email && password)) {
      res.status(400).send("Please provide all values!");
    }

    const user = await User.findOne({ email });
    if (user && comparePasswords(password, user.password)) {
      let cookieCredentials = {
        httpOnly: true, //for security reasons
        secure: process.env.NODE_ENV === "production", // effective after hosting on Versel or Render.com
        sameSite: "strict", // cookies won't be available for reaching from other websites
      };

      // if the Do Not Logout checkbox was checked, then we rewrite the cookieCredentials
      // by adding a new value maxAge to set an expiration date = = 7 days
      if (doNotLogout) {
        cookieCredentials = {
          ...cookieCredentials,
          maxAge: 1000 * 60 * 60 * 24 * 7,
        };
        // * in this case, the token will look like this:
        // access token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
        // .eyJfaWQiOiI2NDljOTBjNzc0NzNmOWQ5NzhkNTQ3MGEiLCJuYW1lIjoiTWFyaWEiLCJsYXN0TmFtZSI6IlNoYXJpbiIsImVtYWlsIjoibWFyaWFAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY4Nzk4NTIzOCwiZXhwIjoxNjg4MDEwNDM4fQ
        // .mW28pmYDWM3IDMfwKf2eHpAbpHksFg1zwgnCw6M7waY; Max-Age=604800;
        // Path=/;
        // ! Expires=Wed, 05 Jul 2023 20:47:18 GMT;
        // HttpOnly; SameSite=Strict
      }

      return res
        .cookie(
          "access token",
          generateAuthToken(
            user._id,
            user.name,
            user.lastName,
            user.email,
            user.isAdmin
          ),
          cookieCredentials
        )
        .status(200)
        .json({
          success: "User logged in successfully",
          userLoggedIn: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            doNotLogout,
          },
        });
    } else {
      res.status(401).send("Wrong credentials");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getUsers, registerUser, loginUser };
