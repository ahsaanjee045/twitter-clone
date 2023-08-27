const { validationResult } = require("express-validator");
const { uploadFile } = require("../utils/utils");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.registerUser = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.errors[0].msg || "User Validation Failed",
      });
    }

    const { username, email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(403).json({
        success: false,
        error: "User already registered with this email address",
      });
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
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
module.exports.loginUser = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.errors[0].msg || "User Validation Failed",
      });
    }

    const { email, password } = req.body;

    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(403).json({
        success: false,
        error: "No User exists with this email address",
      });
    }

    let result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(403).json({
        success: false,
        error: "Invalid Credentials",
      });
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
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
