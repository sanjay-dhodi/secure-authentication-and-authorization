require("dotenv").config();
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/customError");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register user ###################################################################
const registerUser = asyncHandler(async (req, resp) => {
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
      role: foundUser.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign(
    {
      id: foundUser._id.toString(),
    },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );

  // store refresh token in the db
  foundUser.refreshToken = refreshToken;
  await foundUser.save();

  resp.cookie("refreshToken", refreshToken, {
    http: true,
    secure: false,
    samesite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  resp.status(200).json({ success: true, accessToken });
});

// refreshtoken controller

const refreshToken = asyncHandler(async (req, resp) => {
  const refreshTokenFromCookie = req.cookies.refreshToken;

  if (!refreshTokenFromCookie) {
    throw new AppError("refresh token missing ", 401);
  }

  let decode;
  try {
    decode = jwt.verify(
      refreshTokenFromCookie,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      {
        algorithms: ["HS256"],
      }
    );
  } catch (error) {
    throw new AppError("Invalid Token", 401);
  }

  const userWithRefreshToken = await userModel.findOne({
    refreshToken: refreshTokenFromCookie,
  });

  if (!userWithRefreshToken) {
    throw new AppError("Invalid refresh Token", 403);
  }

  // regenerate tokens
  const accessToken = jwt.sign(
    {
      id: userWithRefreshToken._id.toString(),
      role: userWithRefreshToken.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign(
    {
      id: userWithRefreshToken._id.toString(),
    },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );

  // refresh token rotation
  userWithRefreshToken.refreshToken = refreshToken;
  await userWithRefreshToken.save();

  resp.cookie("refreshToken", refreshToken, {
    http: true,
    secure: false,
    samesite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  resp.status(200).json({ success: true, accessToken });
});

// logout controller #######################################################

const logout = asyncHandler(async (req, resp) => {
  const refreshTokenFromCookie = req.cookies.refreshToken;

  if (refreshTokenFromCookie) {
    const data = await userModel.findOneAndUpdate(
      {
        refreshToken: refreshTokenFromCookie,
      },
      {
        $set: {
          refreshToken: null,
        },
      }
    );
  }

  resp.clearCookie("refreshToken", {
    http: true,
    secure: false,
    samesite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  resp.status(200).json({
    success: true,
    message: "logout successfull",
  });
});

module.exports = {
  registerUser,
  login,
  logout,
  refreshToken,
};
