const rateLimit = require("express-rate-limit");
const AppError = require("../utils/customError");

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  handler: (req, res, next) => {
    return next(
      new AppError("Too many login attempts. Please try again later.", 429)
    );
  },
});

module.exports = authRateLimiter;
