"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { validationResult } = require("express-validator");
// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((error) => `${error.msg}`);
        const err = {
            errors: errors,
            status: 400,
            title: "Bad request."
        };
        next(err);
    }
    next();
};
module.exports = {
    handleValidationErrors,
};
