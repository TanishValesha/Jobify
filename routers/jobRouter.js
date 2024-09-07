// import { getAllJobs } from "../controllers/jobController";
const jobController = require("../controllers/jobController");
const express = require("express");
const router = express.Router();
const jobInputValidator = require("../middlewares/validatorMiddleware");
const { authFunction } = require("../middlewares/authMiddleware");

router
  .get("/", authFunction, jobController.getAllJob)
  .post(
    "/",
    authFunction,
    jobInputValidator.validateJobCreation,
    jobController.createJobs
  )
  .delete(
    "/:id",
    authFunction,
    jobInputValidator.validateID,
    jobController.deleteJob
  )
  .get("/:id", authFunction, jobInputValidator.validateID, jobController.getJob)
  .put(
    "/:id",
    authFunction,
    jobInputValidator.validateID,
    jobController.editJob
  );

module.exports = router;
