const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/customError");
const mongoose = require("mongoose");
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
const getSingleUser = asyncHandler(async (req, resp) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError("Invalid User Id", 400);
  }

  const foundSingleUser = await userModel
    .findById(userId)
    .select("-password -refreshToken");

  if (!foundSingleUser) {
    throw new AppError("User not found", 404);
  }

  resp.status(200).json({ success: true, user: foundSingleUser });
});

// update User controller #################################################################
const updateUser = asyncHandler(async (req, resp) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError("Invalid user id", 400);
  }

  const updatedUser = await userModel
    .findByIdAndUpdate(
      userId,
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    )
    .select("-password -refreshToken");

  if (!updatedUser) {
    throw new AppError("User not found", 404);
  }

  resp.status(200).json({
    success: true,
    message: "User Successfully updated",
    user: updatedUser,
  });
});

// delete User controller ###################################################################
const deleteUser = asyncHandler(async (req, resp) => {});

module.exports = {
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
