const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controllers");
const authMiddleware = require("../middlewares/jwtVerify");
const authorizeRoles = require("../middlewares/authorizeRole.middleware");

router.get("/api/user/alluser", userController.getAllUser);
router.get(
  "/api/user/singleuser/:id",
  authMiddleware,
  authorizeRoles("user"),
  userController.getSingleUser
);
router.patch("/api/user/update/:id", userController.updateUser);
router.delete("/api/user/delete/:id", userController.deleteUser);

module.exports = router;
