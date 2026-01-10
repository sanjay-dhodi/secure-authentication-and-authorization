const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controllers");
const { validateBody } = require("../middlewares/validation.middleware");
const { registerSchema, loginSchema } = require("../validations/auth.schema");

router.post(
  "/api/auth/register",
  validateBody(registerSchema),
  authController.registerUser
);
router.post("/api/auth/login", validateBody(loginSchema), authController.login);
router.post("/api/auth/logout", authController.logout);
router.post("/api/auth/refresh", authController.refreshToken);

module.exports = router;
