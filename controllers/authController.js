const bcrypt = require("bcrypt");
const StatusCodes = require("http-status-codes");
const { User } = require("../models/userModel");
const customError = require("../errors/customError");
const { generateToken } = require("../utils/jwtUtil");

exports.registerUser = async (req, res) => {
  const docs = await User.countDocuments();
  const { firstName, lastName, email, hashPassword, city, country, role } =
    req.body;
  const newUser = new User({
    firstName,
    lastName,
    email,
    hashPassword: bcrypt.hashSync(hashPassword, 10),
    city,
    country,
    role: docs == 0 ? "Admin" : "User",
  });

  await newUser
    .save()
    .then(() => {
      res.status(StatusCodes.CREATED).send({ success: true, newUser });
    })
    .catch((e) => {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ success: false, message: e.message });
    });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    // throw new customError.UnauthenticatedError("User Not Found! Create One");
  }
  let isAuthenticated = bcrypt.compareSync(password, user.hashPassword);
  if (isAuthenticated === false) {
    // throw new customError.UnauthenticatedError("Incorect Password!");
  } else {
    const token = generateToken({ userId: user._id, role: user.role });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
    res.status(StatusCodes.OK).json({ user, token });
  }
};

exports.logoutUser = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ message: "User logged out!" });
};
