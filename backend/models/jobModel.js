const mongoose = require("mongoose");
const dayjs = require("dayjs");

const jobSchema = mongoose.Schema(
  {
    position: {
      type: String,
    },
    company: {
      type: String,
    },
    location: {
      type: String,
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship"],
      default: "Part-time",
    },
    jobStatus: {
      type: String,
      enum: ["Interview", "Declined", "Accepted", "Pending"],
      default: "Interview",
    },
    createdAt: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamp: true,
  }
);

exports.Job = mongoose.model("Job", jobSchema);
