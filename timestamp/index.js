const express = require("express");

const AppError = require("./lib/appError");

const app = express();

const getTimestamp = (req, res, next) => {
  let date;

  const dateParam = req.params.date;

  if (!dateParam) {
    date = new Date();
  } else if (/^\d+$/.test(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    date = new Date(dateParam);
  }

  if (date.toString() === "Invalid Date") {
    return next(new AppError("Invalid Date", 400));
  }

  const unix = date.getTime();
  const utc = date.toUTCString();

  res.status(200).json({
    unix,
    utc,
  });
};

app.get("/api", getTimestamp);

app.get("/api/:date", getTimestamp);

app.all(/(.*)/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    error: err.message,
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
