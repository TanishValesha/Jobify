const { StatusCodes } = require("http-status-codes");

exports.customErrorMiddleWare = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something Went Wrong!";
  res.status(statusCode).json(message);
};
