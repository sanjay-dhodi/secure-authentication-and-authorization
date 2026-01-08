const asyncHandler = require("../utils/asyncHandler");
const userModel = require("../models/user.model");

// get all User controller #############################################################
const getAllUser = asyncHandler(async (req, resp) => {
  const users = await userModel.find().select("-password -refreshToken");

  if (users.length === 0) {
    resp.status(200).json({ sucess: true, message: "No User Found", users });
  }

  resp.status(200).json({ success: true, users });
});

// get single User controller ############################################################
const getSingleUser = asyncHandler(async (req, resp) => {});

// update User controller #################################################################
const updateUser = asyncHandler(async (req, resp) => {});

// delete User controller ###################################################################
const deleteUser = asyncHandler(async (req, resp) => {});

module.exports = {
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
