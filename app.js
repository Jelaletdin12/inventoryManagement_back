// app.js
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const AppError = require('./utils/appError');
require('dotenv').config();

//const globalErrorHandler = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');
const inventoryRouter = require('./routes/inventoryRoutes');


const app = express();

// Security middleware
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour.',
});

app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));
app.use(xss());
app.use(hpp());

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/inventory', inventoryRouter);

// Handle undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});



module.exports = app;
