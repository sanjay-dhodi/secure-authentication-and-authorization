const globalErrorHandler = (err, req, resp, next) => {
  return resp.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode || 500,
    message: err.message || "something wrong",
    errors: err.errors || undefined,
  });
};

module.exports = globalErrorHandler;
