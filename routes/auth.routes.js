const express = require("express");
const router = express.Router();
const AppError = require("../errors/customError");

router.post("/api/auth/register", (req, resp, next) => {
  next(new AppError("error from register api", 401));
});
// router.post("/api/auth/login");
// router.post("/api/auth/logout");
// router.post("/api/auth/refresh");

module.exports = router;
