const express = require("express");
const app = express();
require("./config/dbConnection");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const globalErrorHandler = require("./middlewares/globalErrorHandaler");

app.use(bodyparser.urlencoded());
app.use(cookieparser());
app.use(bodyparser.json());

app.use(authRoutes);
app.use(userRoutes);

app.use(globalErrorHandler);

app.listen(3000, () => {
  console.log("server started");
});
