require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => {
    console.log("db connected ");
  })
  .catch((err) => {
    console.log("db connection fail");
  });
