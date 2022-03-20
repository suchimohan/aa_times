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
const axios = require("axios");
const config = require('../../config');
const dummydata = require('./dummydata');
const { restoreUser } = require('../../utils/auth');
const { User, PinnedArticles } = require('../../db/models');
router.get("/topstories", restoreUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (!config.useRealData) {
            return res.json(dummydata.sample_top_stories);
        }
        let topic = req.query.topic;
        let response = yield axios.get(`https://api.nytimes.com/svc/topstories/v2/${topic}.json?api-key=${config.nyTimesAPIKey}`);
        console.log(response.data.status);
        if (response.data.status === 'OK') {
            let isPinned = {};
            const { user } = req;
            if (user) {
                const pinnedArticles = yield PinnedArticles.findAll({
                    where: {
                        userId: user.id,
                    }
                });
                for (let i = 0; i < pinnedArticles.length; i++) {
                    isPinned[pinnedArticles[i].short_url] = true;
                }
            }
            let newsArticles = response.data.results.filter((article) => article.title && article.short_url && article.abstract);
            for (let i = 0; i < newsArticles.length; i++) {
                let article = newsArticles[i];
                newsArticles[i].id = i;
                newsArticles[i].image = (_b = (_a = article.multimedia) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url;
                newsArticles[i].is_favorite = isPinned[article.short_url] || false;
            }
            return res.json(newsArticles);
        }
    }
    catch (e) {
        console.log(e);
        next(e);
    }
}));
module.exports = router;
