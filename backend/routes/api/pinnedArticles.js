"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const asyncHandler = require('express-async-handler');
const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser } = require('../../utils/auth');
const { User, PinnedArticles } = require('../../db/models');
router.get('/', restoreUser, asyncHandler(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = req;
        let pins = yield PinnedArticles.findAll({
            where: {
                userId: user.id
            },
            include: [{ model: User }]
        });
        for (let i = 0; i < pins.length; i++) {
            pins[i].dataValues.is_favorite = true;
        }
        return res.json(pins);
    });
}));
router.post('/', handleValidationErrors, restoreUser, asyncHandler(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = req;
        const article = req.body;
        const pin = yield PinnedArticles.create({
            userId: user.id,
            title: article.title,
            abstract: article.abstract,
            byline: article.byline,
            short_url: article.short_url,
            image: article.image,
            published_date: article.published_date,
        });
        return res.json(pin);
    });
}));
router.delete('/', handleValidationErrors, restoreUser, asyncHandler(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = req;
        const article = req.body;
        const pinnedArticle = yield PinnedArticles.findOne({
            where: {
                userId: user.id,
                short_url: article.short_url
            }
        });
        if (pinnedArticle) {
            yield pinnedArticle.destroy();
            return res.status(204).end();
        }
        else {
            const err = {
                status: 404
            };
            next(err);
        }
    });
}));
module.exports = router;
