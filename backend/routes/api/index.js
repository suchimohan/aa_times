"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const newsRouter = require("./newsapi");
const pinnedArticleRouter = require("./pinnedArticles");
router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/news", newsRouter);
router.use("/pinnedArticles", pinnedArticleRouter);
module.exports = router;
