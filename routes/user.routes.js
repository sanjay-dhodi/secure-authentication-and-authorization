const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controllers");

router.get("/api/user/alluser", userController.getAllUser);
router.get("/api/user/singleuser/:id", userController.getSingleUser);
router.patch("/api/user/update/:id", userController.updateUser);
router.delete("/api/user/delete/:id", userController.deleteUser);

module.exports = router;
