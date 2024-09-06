const express = require("express");
const router = express.Router();
const { authFunction } = require("../middlewares/authMiddleware");
const {
  getCurrentUser,
  updateProfile,
} = require("../controllers/userController");

router.get("/current-user", getCurrentUser).put("/update-user", updateProfile);

module.exports = router;
