const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controllers");
const authMiddleware = require("../middlewares/jwtVerify");
const authorizeRoles = require("../middlewares/authorizeRole.middleware");
const {
  validateParams,
  validateBody,
} = require("../middlewares/validation.middleware");
const { paramSchema } = require("../validations/params.schema");
const { updateUserSchema } = require("../validations/user.schema");
const checkOwnership = require("../middlewares/ownership.middleware");

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
  checkOwnership,
  validateParams(paramSchema),
  userController.getSingleUser
);

router.patch(
  "/api/user/update/:id",
  authMiddleware,
  authorizeRoles("user", "admin"),
  checkOwnership,
  validateParams(paramSchema),
  validateBody(updateUserSchema),
  userController.updateUser
);
router.delete(
  "/api/user/delete/:id",
  authMiddleware,
  authorizeRoles("admin"),
  validateParams(paramSchema),
  userController.deleteUser
);

module.exports = router;
