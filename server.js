const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.routes");
const globalErrorHandler = require("./errors/globalErrorHandaler");

app.use(authRoutes);
app.use(globalErrorHandler);

app.listen(3000, () => {
  console.log("server started");
});
