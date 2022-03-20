const { validationResult } = require("express-validator");
import {Request, Response, NextFunction} from "express";

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req: Request, _res: Response, next: NextFunction) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error:any) => `${error.msg}`);

    const err = {
      errors : errors,
      status : 400,
      title : "Bad request."
    }
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors,
};
