const { check } = require("express-validator");

module.exports.registerValidation = [
  check("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Username must not be empty")
    .isLength({ min: 4, max: 40 })
    .withMessage("Username must be at between 4 to 40 characters"),
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email must not be empty")
    .isEmail()
    .withMessage("Not a valid Email"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password must not be empty")
    .custom((value) => {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        value
      );
    })
    .withMessage("Not A Valid Password"),
];

module.exports.loginValidation = [
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email must not be empty")
    .isEmail()
    .withMessage("Not a valid Email"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password must not be empty"),
];
