import express from "express";
const router = express.Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const newsRouter = require("./newsapi");
const pinnedArticleRouter = require("./pinnedArticles")


router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/news",newsRouter);

router.use("/pinnedArticles",pinnedArticleRouter);

module.exports = router;
