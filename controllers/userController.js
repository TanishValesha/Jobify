const StatusCodes = require("http-status-codes");
const { User } = require("../models/userModel");

exports.getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user });
};

exports.updateProfile = async (req, res) => {
  const data = req.body;
  const user = await User.findByIdAndUpdate({ _id: req.user.userId }, data, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ user });
};
