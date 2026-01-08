const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controllers");

router.get("/api/user/alluser", userController.getAllUser);
router.get("/api/user/singleuser/:id", userController.getSingleUser);
router.put("/api/user/update", userController.updateUser);
router.delete("/api/user/delete", userController.deleteUser);

module.exports = router;
