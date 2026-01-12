require("dotenv").config();
const express = require("express");
const app = express();
require("./config/dbConnection");
const cors = require("cors");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const globalErrorHandler = require("./middlewares/globalErrorHandaler");
const AppError = require("./utils/customError");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(bodyparser.urlencoded());
app.use(cookieparser());
app.use(bodyparser.json());

app.use(authRoutes);
app.use(userRoutes);

// health check route for server health
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use((req, resp, next) => {
  return next(new AppError("URL Not Found", 404));
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server started");
});
