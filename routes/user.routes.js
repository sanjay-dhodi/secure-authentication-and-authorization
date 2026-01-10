const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controllers");
const authMiddleware = require("../middlewares/jwtVerify");
const authorizeRoles = require("../middlewares/authorizeRole.middleware");
const { validateParams } = require("../middlewares/validation.middleware");
const { paramSchema } = require("../validations/params.schema");

router.get(
  "/api/user/alluser",
  authMiddleware,
  authorizeRoles("admin"),
  userController.getAllUser
);
router.get(
  "/api/user/singleuser/:id",
  authMiddleware,
  authorizeRoles("user", "admin"),
  userController.getSingleUser
);

// body check validation
router.patch(
  "/api/user/update/:id",
  authMiddleware,
  authorizeRoles("user", "admin"),
  userController.updateUser
);
router.delete(
  "/api/user/delete/:id",
  authMiddleware,
  authorizeRoles("admin"),
  userController.deleteUser
);

module.exports = router;
