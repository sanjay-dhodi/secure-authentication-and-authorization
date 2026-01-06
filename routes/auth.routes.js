const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controllers");

router.post("/api/auth/register", authController.login);
// router.post("/api/auth/login");
// router.post("/api/auth/logout");
// router.post("/api/auth/refresh");

module.exports = router;
