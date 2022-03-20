import express from "express";
const router = express.Router();
const axios = require("axios")
const config = require('../../config')
const dummydata = require('./dummydata')
import {Request, Response, NextFunction} from "express";
const { restoreUser } = require('../../utils/auth');
const { User, PinnedArticles } = require('../../db/models');

router.get("/topstories", restoreUser, async(req: Request, res: Response, next: NextFunction) => {
  try{
    if(!config.useRealData) {
      return res.json(dummydata.sample_top_stories)
    }

    let topic = req.query.topic

    let response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${topic}.json?api-key=${config.nyTimesAPIKey}`)
    console.log(response.data.status)
    if (response.data.status === 'OK'){
      let isPinned: {[key:string]:boolean} = {}
      const { user } = req as any;
      if (user) {
        const pinnedArticles = await PinnedArticles.findAll({
            where: {
                userId : user.id,
            }
        });

        for (let i=0; i<pinnedArticles.length; i++) {
          isPinned[pinnedArticles[i].short_url] = true;
        }
      }

      let newsArticles = response.data.results.filter((article:any) => article.title && article.short_url && article.abstract);
      for (let i = 0; i < newsArticles.length; i++) {
        let article = newsArticles[i];
        newsArticles[i].id = i;
        newsArticles[i].image= article.multimedia?.[0]?.url;
        newsArticles[i].is_favorite = isPinned[article.short_url] || false;
      }
      return res.json(newsArticles);
    }
  } catch (e){
    console.log(e)
    next(e)
  }
})


module.exports = router;
