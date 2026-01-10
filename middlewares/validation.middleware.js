const { safeParse } = require("zod");
const AppError = require("../utils/customError");

const validateBody = (schema) => {
  return (req, resp, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => {
        return {
          field: issue.path.join("."),
          message: issue.message,
        };
      });

      return next(new AppError("validation failed", 400, errors));
    }

    req.body = result.data;

    next();
  };
};

const validateParams = (schema) => {
  return (req, resp, next) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => {
        return {
          field: issue.path.join("."),
          message: issue.message,
        };
      });

      return next(new AppError("Validation failed", 400, errors));
    }

    req.params = result.data;
    next();
  };
};

module.exports = { validateBody, validateParams };
