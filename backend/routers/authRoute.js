const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validator = require("../middlewares/validatorMiddleware");
const { authFunction } = require("../middlewares/authMiddleware");

router
  .post("/register", validator.validateRegister, authController.registerUser)
  .post("/login", validator.validateLogin, authController.loginUser)
  .get("/logout", authController.logoutUser);

module.exports = router;
