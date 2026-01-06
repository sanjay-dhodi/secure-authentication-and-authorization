const asyncHandler = (fn) => {
  return (req, resp, next) => {
    Promise.resolve(fn(req, resp, next)).catch((err) => next(err));
  };
};

module.exports = asyncHandler;
