const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { ValidationError } = require("sequelize");
import {Request, Response, NextFunction} from "express";
const routes = require("./routes");
const { environment } = require("./config");
const isProduction = environment === "production";

const app = express();

app.use(morgan("dev"));

app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}
// helmet helps set a variety of headers to better secure your app
app.use(helmet({
  contentSecurityPolicy: false
}));

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

app.use(routes); // Connect all the routes

// Catch unhandled requests and forward to error handler.
app.use((_req: Request, _res: Response, next: NextFunction) => {
  const err = {
    title : "Resource Not Found",
    errors : ["The requested resource couldn't be found."],
    status : 404
  }
  next(err);
});

// Process sequelize errors
app.use((err: any, _req: Request, _res: Response, next: NextFunction) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e:any) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});

// Error formatter
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
