// Validations Helpers
const  { check } = require('express-validator');

// Register
exports.validRegister = [
  check("name", "Username is required")
    .isEmpty()
    .isLength({
      max: 32,
    })
    .withMessage("Username cannot be over 32 characters long"),
  check("email").isEmpty().withMessage("Must be a valid Email address"),
  check("password", "Password is required").notEmpty(),
  check("password")
    .isLength({
      min: 6,
    })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain a number"),
];

// Login
exports.validLogin = [
  check("email").isEmail().withMessage("Must be a valid Email address"),
  check("password", "Password is required").notEmpty(),
  check("password")
    .isLength({
      min: 6,
    })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain a number"),
];

// Forgot Password
exports.forgotPasswordValidator = [
    check('email')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Must be a valid Email address')
]

// Reset Password
exports.resetPasswordValidator = [
    check('newPassword')
    .not()
    .isEmpty()
    .isLength({
        min: 6
    }).withMessage('Password must be at least 6 characters long')
]