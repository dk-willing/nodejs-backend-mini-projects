const AppError = require('./../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  err = new AppError(message, 404);
  return err;
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input. ${errors.join('. ')}`;
  err = new AppError(message, 400);

  return err;
};

const handleDuplicateKeysDB = (err) => {
  const value = err.cause.errorResponse.errmsg.match(/"(.*?)"/)[0];
  const message = `Duplicate key ${value}. Kindly use another value`;
  err = new AppError(message, 400);
  return err;
};

const sendErrorDev = (res, err) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (res, err) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log('ERROR 💥 : ', err);
    res.status(err.statusCode).json({
      status: err.status,
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(res, err);
  } else if (process.env.NODE_ENV.trim() === 'production') {
    let error = err;

    if (error.name === 'CastError') error = handleCastErrorDB(error);

    if (error.cause.code === 11000) error = handleDuplicateKeysDB(error);

    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);

    sendErrorProd(res, error);
  }
};
