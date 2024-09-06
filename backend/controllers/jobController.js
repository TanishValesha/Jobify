const mongoose = require("mongoose");
const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { Job } = require("../models/jobModel");
const customError = require("../errors/customError");

exports.getAllJob = async (req, res) => {
  const { jobStatus, type, sortType } = req.query;
  console.log(req.query);

  let sortOrder = "";

  let queryObj = {
    createdBy: req.user.userId,
  };

  if (sortType === "newest") {
    sortOrder = "-createdAt";
  } else if (sortType === "oldest") {
    sortOrder = "createdAt";
  } else if (sortType === "a-z") {
    sortOrder = "position";
  } else if (sortType === "z-a") {
    sortOrder = "-position";
  }

  if (jobStatus && jobStatus !== "all") {
    queryObj.jobStatus = jobStatus;
  }
  if (type && type !== "all") {
    queryObj.jobType = type;
  }
  const jobList = await Job.find(queryObj).sort(sortOrder);

  if (!jobList) {
    throw new customError.NotFoundError("No Jobs Listed");
  } else {
    res.status(StatusCodes.OK).send(jobList);
  }
};

exports.createJobs = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const newJob = new Job(req.body);
  await newJob
    .save()
    .then(() => {
      res.status(StatusCodes.CREATED).send({ success: true, newJob });
    })
    .catch((e) => {
      res.status(400).send({ success: false, message: e.message });
    });
};

exports.deleteJob = async (req, res) => {
  try {
    const id = req.params.id;
    await Job.findByIdAndDelete(id);
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Job Removed!",
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: error.message,
    });
  }
};

exports.getJob = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      throw new Error("Invalid ID!");
    }
    const job = await Job.findById(id);
    if (!job) {
      throw new customError.NotFoundError("Sorry, Job not found!");
    } else {
      res.status(StatusCodes.OK).send(job);
    }
  } catch (error) {
    res.status(404).send({
      success: false,
      message: error.message,
    });
  }
};

exports.editJob = async (req, res) => {
  try {
    const {
      position,
      company,
      createdAt,
      location,
      jobType,
      jobStatus,
      jobType2,
    } = req.body;
    const id = req.params.id;
    const job = await Job.findByIdAndUpdate(
      id,
      {
        position,
        company,
        location,
        jobType,
        jobStatus,
        jobType2,
        createdAt,
      },
      { new: true }
    );
    if (!job) {
      throw new customError.NotFoundError("Sorry, Job not found!");
    } else {
      res
        .status(StatusCodes.CREATED)
        .send({ success: true, message: "Job Updated!", job });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
