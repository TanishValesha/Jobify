const { UnauthenticatedError } = require("../errors/customError");
const { verifyJWT } = require("../utils/jwtUtil");

exports.authFunction = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      throw new UnauthenticatedError("Bad Request");
    }
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new Error(error);
  }
};
