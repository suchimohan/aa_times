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
router.get("/topstories", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (!config.useRealData) {
            return res.json(dummydata.sample_top_stories);
        }
        let topic = req.query.topic;
        let response = yield axios.get(`https://api.nytimes.com/svc/topstories/v2/${topic}.json?api-key=${config.nyTimesAPIKey}`);
        console.log(response.data.status);
        if (response.data.status === 'OK') {
            let newsArticles = response.data.results.filter((article) => article.title);
            for (let i = 0; i < newsArticles.length; i++) {
                newsArticles[i].id = i;
                newsArticles[i].image = (_b = (_a = newsArticles[i].multimedia) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url;
                newsArticles[i].is_favorite = false;
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
