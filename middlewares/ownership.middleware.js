const AppError = require("../utils/customError");

const checkOwnership = (req, resp, next) => {
  if (req.user.role === "admin") {
    return next();
  }

  if (req.user.id !== req.params.id) {
    return next(new AppError("Not your resource", 403));
  }

  next();
};

module.exports = checkOwnership;
