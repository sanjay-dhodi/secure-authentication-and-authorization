const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controllers");

router.post("/api/auth/register", authController.registerUser);
router.post("/api/auth/login", authController.login);
router.post("/api/auth/logout", authController.logout);
router.post("/api/auth/refresh", authController.refreshToken);

module.exports = router;
