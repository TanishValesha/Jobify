const mongoose = require("mongoose");
const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { Job } = require("../models/jobModel");

exports.getAppStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  res.json(stats);

  console.log(stats);
};
