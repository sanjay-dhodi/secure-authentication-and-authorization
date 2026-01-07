const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controllers");

router.post("/api/auth/register", authController.registerUser);
router.post("/api/auth/login", authController.loginUser);
// router.post("/api/auth/logout");
router.post("/api/auth/refresh", authController.refreshToken);

module.exports = router;
