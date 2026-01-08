const jwt = require("jsonwebtoken");
const AppError = require("../utils/customError");
const userModel = require("../models/user.model");

const authMiddleware = async (req, resp, next) => {
  try {
    const authHeaders = req.headers.authorization;

    if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
      return next(new AppError("Unauthorized ", 401));
    }

    const token = authHeaders.split(" ")[1];

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });

    const checkUser = await userModel
      .findById(decodedUser.id)
      .select("-password -refreshToken");

    if (!checkUser) {
      return next(new AppError("Unauthorized", 401));
    }

    req.user = {
      id: decodedUser.id,
      role: decodedUser.role,
    };

    next();
  } catch (error) {
    return next(new AppError("Unauthorized", 401));
  }
};

module.exports = authMiddleware;
