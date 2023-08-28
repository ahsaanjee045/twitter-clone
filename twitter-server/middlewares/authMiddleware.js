const jwt = require("jsonwebtoken");
const CustomError = require("./CustomError");
const User = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    let headers = req.headers.authorization;

    if (!headers || !headers.startsWith("Bearer ")) {
      return next(new CustomError(401, "No Authorization header was provided"));
    }
    let token = headers.split(" ")[1];
    if (!token) {
      return next(new CustomError(401, "No Token provided"));
    }

    let { _id } = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(_id);
    if (!user) {
      return next(new CustomError(401, "No User found with provided token"));
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      next(
        new CustomError(401, "Your token has been expird. Please login again")
      );
    } else if (error.name === "JsonWebTokenError") {
      next(new CustomError(401, "Your provided an invalid token."));
    } else {
      next(500, error.message);
    }
  }
};
