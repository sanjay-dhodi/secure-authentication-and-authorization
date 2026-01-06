const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/customError");
const userModel = require("../models/user.model");
const { required } = require("zod/mini");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register user ###################################################################
const register = asyncHandler(async (req, resp) => {
  const allreadyExist = await userModel.findOne({ email: req.body.email });

  if (allreadyExist) {
    throw new AppError("user already exists", 409);
  }

  const hashPassword = await bcrypt.hash(req.body.password, 12);

  const user = await userModel.create({ ...req.body, password: hashPassword });

  const userObj = user.toObject();

  const { password, ...safeUser } = userObj;

  return resp.status(201).json({
    sucess: true,
    message: "user successfully register",
    user: safeUser,
  });
});

// login controller #########################################################################

const login = asyncHandler(async (req, resp) => {
  const foundUser = await userModel.findOne({ email: req.body.email });

  if (!foundUser) {
    throw new AppError("user not exist", 404);
  }

  const matched = await bcrypt.compare(req.body.password, foundUser.password);

  if (!matched) {
    throw new AppError("Invalid Credentials", 401);
  }

  //   jwt implementation

  const accessToken = jwt.sign(
    {
      id: foundUser._id.toString(),
      name: foundUser.name,
      role: foundUser.role,
    },
    process.env.JWT_SECRET,
    {
      algorithm: "HS256",
      expiresIn: "15m",
    }
  );

  resp.status(200).json({ success: true, accessToken });
});

module.exports = {
  register,
  login,
};
