const express = require("express");
const router = express.Router();
const { authFunction } = require("../middlewares/authMiddleware");
const statsController = require("../controllers/statsController");

router.get("/", authFunction, statsController.getAppStats);

module.exports = router;
