const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoute");
const userRouter = require("./routes/userRoute");
const AppError = require("./utils/appError");
const errorController = require("./controllers/errorController");

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  req.requestTime = new Date();
  next();
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.use(/(.*)/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorController);

module.exports = app;
