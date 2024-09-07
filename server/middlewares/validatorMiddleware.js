const expressV = require("express-validator");
const customError = require("../errors/customError");
const { default: mongoose } = require("mongoose");
const { User } = require("../models/userModel");
const { Job } = require("../models/jobModel");

const validatorFunction = (validatingConditions) => {
  return [
    validatingConditions,
    (req, res, next) => {
      const errors = expressV.validationResult(req);
      if (!errors.isEmpty()) {
        const errorMsg = errors.array().map((err) => err.msg);
        throw new customError.BadRequestError(errorMsg);
      }
      next();
    },
  ];
};

exports.validateJobCreation = validatorFunction([
  expressV.body("position").notEmpty().withMessage("Position is required"),
  expressV.body("company").notEmpty().withMessage("Company is required"),
  expressV.body("location").notEmpty().withMessage("Location is required"),
]);

exports.validateID = validatorFunction([
  expressV.param("id").custom(async (value, { req }) => {
    const job = await Job.findById(value);
    if (!job) throw new customError.NotFoundError("Job not Found!");
    const isAdmin = req.user.userId === "Admin";
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner) {
      throw new customError.UnauthenticatedError("Permission Denied");
    }
    console.log(req);
  }),
]);

exports.validateRegister = validatorFunction([
  expressV.body("firstName").notEmpty().withMessage("First Name is required"),
  expressV.body("lastName").notEmpty().withMessage("Last Name is required"),
  expressV
    .body("hashPassword")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password should be minimum 8 characters long"),
  expressV.body("city").notEmpty().withMessage("City field is required"),
  expressV.body("country").notEmpty().withMessage("Country field is required"),
  expressV
    .body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter an valid email")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new customError.BadRequestError("Email already in use....");
      }
    }),
]);

exports.validateLogin = validatorFunction([
  expressV
    .body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password should be minimum 8 characters long"),
  expressV
    .body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter an valid email"),
]);
