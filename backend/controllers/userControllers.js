const User = require("../models/UserModel");
const Review = require("../models/ReviewModel");
const Product = require("../models/ProductModel");
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
      res.status(400).send("user exists");
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
          "access_token",
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

    const user = await User.findOne({ email }).orFail();
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
          "access_token",
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

const updateUserProfile = async (req, res, next) => {
  try {
    // find the logged in user in the DB
    const user = await User.findById(req.user._id).orFail();

    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber;
    user.address = req.body.address;
    user.country = req.body.country;
    user.zipCode = req.body.zipCode;
    user.city = req.body.city;
    user.state = req.body.state;

    // Changing the password (the password is required as a req.body.password in all cases)
    if (req.body.password !== user.password) {
      user.password = hashPassword(req.body.password);
      // after changing the password, user won't be able lo access restricted routes.
      // And will need to log in again with the new password
    }

    await user.save();

    res.status(200).json({
      success: "The profile has been updated",
      userUpdated: {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getUserProfileData = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const writeReview = async (req, res, next) => {
  try {
    // Make sure that both collections (Reviews and Products) are successfully saved in the DB
    // or, in case of error, none of them
    // (as we don't want only Reviews collection to be saved without the Product collection, or vice versa).
    // For this, use session transaction from MongoDB
    const session = await Review.startSession(); // ! Session transaction

    const { comment, rating } = req.body;
    if (!(comment && rating)) {
      res
        .status(400)
        .send("Please provide a comment and rating for the product");
    }

    // Create review id manually as we need it for saving in the Review collection
    const ObjectId = require("mongodb").ObjectId;
    let reviewId = new ObjectId();

    session.startTransaction(); // ! Session transaction

    await Review.create(
      [
        {
          _id: reviewId,
          comment: comment,
          rating: Number(rating),
          user: {
            _id: req.user._id,
            name: req.user.name + " " + req.user.lastName,
          },
        },
      ],
      { session: session }
    ); // ! Session transaction

    // Adding the review id to the Product collection
    const product = await Product.findById(req.params.productId)
      .populate("reviews")
      .session(session); // ! Session transaction

    // Allow the user create only one review per product
    const alreadyReviewed = product.reviews.find(
      (review) => review.user._id.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      await session.abortTransaction(); // ! Session transaction
      session.endSession(); // ! Session transaction
      res.status(400).send("Product already reviewed");
    }

    let prc = [...product.reviews];
    prc.push({ rating: rating });
    product.reviews.push(reviewId);

    // Calculating the average rating of the product
    if (product.reviews.length === 1) {
      product.rating = Number(rating);
      product.reviewsNumber = 1;
    } else {
      product.reviewsNumber = product.reviews.length;
      product.rating =
        prc
          .map((item) => Number(item.rating))
          .reduce((sum, item) => (sum += item), 0) / product.reviews.length;
    }

    await product.save();

    await session.commitTransaction(); // ! Session transaction
    session.endSession(); // ! Session transaction
    res.status(201).send("Review created successfully");
  } catch (err) {
    await session.abortTransaction(); // ! Session transaction
    next(err);
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select("name lastName email isAdmin")
      .orFail();

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const updateSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();

    // On the frontend, Admin needs only the following fields to update the user:
    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    await user.save();

    res.status(200).json({
      message: "user updated!",
      user,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id }).orFail();

    res.status(200).json({
      message: "user deleted",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfileData,
  writeReview,
  getSingleUser,
  updateSingleUser,
  deleteUser,
};
