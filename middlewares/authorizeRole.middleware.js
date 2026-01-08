const AppError = require("../utils/customError");

const authorizeRoles = (...allowedRoles) => {
  return (req, resp, next) => {
    if (!req.user || !req.user.role) {
      return next(new AppError("Unautorized", 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError("Forbidden", 403));
    }

    next();
  };
};

module.exports = authorizeRoles;
