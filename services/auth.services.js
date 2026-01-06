const AppError = require("../utils/customError");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

const registerUser = async (reqBody) => {
  //check user
  //   const allreadyExist = await userModel.findOne({ email: reqBody.email });
  //   if (allreadyExist) {
  //     throw new AppError("user already exists", 409);
  //   }
  //   const hashPassword = await bcrypt.hash(reqBody.password, 12);
  //   const user = await userModel.create({ ...reqBody, password: hashPassword });
  //   return user;
};

module.exports = { registerUser };
