const CustomError = require("../middlewares/CustomError");

module.exports = async (err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || "Internal Server Error";
  err.stack = process.env.NODE_ENV !== "production" ? err.stack : null;

  if (err.name === "CastError") {
    message = `Resource not Found : ${err.path}`;
    err = new CustomError(400, message);
  }
  return res.status(err.status).json({
    success: false,
    error: err.message,
    stack: err.stack,
  });
};
