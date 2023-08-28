const { validationResult } = require("express-validator");
const { uploadFile } = require("../utils/utils");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CustomError = require("../middlewares/CustomError");

module.exports.registerUser = async (req, res, next) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new CustomError(400, errors.errors[0].msg));
    }

    const { username, email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
      return next(
        new CustomError(400, "User already registered with this email address")
      );
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    let url = await uploadFile(req.file);
    user = await User.create({
      username: username.toLowerCase().split(" ").join("_"),
      email: email,
      password: hashedPassword,
      profilePicture: url,
    });

    let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user = user.toObject();
    delete user.password;

    res.status(200).json({
      success: true,
      data: {
        ...user,
        token,
      },
    });
  } catch (error) {
    next(500, error.message);
  }
};
module.exports.loginUser = async (req, res, next) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new CustomError(400, errors.errors[0].msg));
    }

    const { email, password } = req.body;

    let user = await User.findOne({ email: email });
    if (!user) {
      return next(
        new CustomError(403, "No User exists with this email address")
      );
    }

    let result = await bcrypt.compare(password, user.password);
    if (!result) {
      return next(new CustomError(403, "Invalid Credentials"));
    }

    let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user = user.toObject();
    delete user.password;

    res.status(200).json({
      success: true,
      data: {
        ...user,
        token,
      },
    });
  } catch (error) {
    next(500, error.message);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    let users = await User.find({ email: { $ne: req.user.email } }).select(
      "-password"
    );
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(500, error.message);
  }
};

module.exports.searchUser = async (req, res, next) => {
  try {
    let keyword = req.query.keyword
      ? {
          $or: [
            { username: { $regex: req.query.keyword, $options: "i" } },
            { email: { $regex: req.query.keyword, $options: "i" } },
          ],
          email: { $ne: req.user.email },
        }
      : { email: { $ne: req.user.email } };
    let users = await User.find(keyword).select("-password");
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {}
};
