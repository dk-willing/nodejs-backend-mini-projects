const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const errorController = require('./controllers/errorController');
const menuRouter = require('./routes/menuRoute');
const userRouter = require('./routes/userRoute');

const app = express();

app.use(express.json());

app.set('query parser', 'extended');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/menu', menuRouter);
app.use('/api/v1/users', userRouter);

app.all(/(.*)/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorController);

module.exports = app;
