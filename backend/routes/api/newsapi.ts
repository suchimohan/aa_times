import express from "express";
const router = express.Router();
const axios = require("axios")
const config = require('../../config')
const dummydata = require('./dummydata')
import {Request, Response} from "express";

router.get("/topstories", async(req: Request, res: Response, next: any) => {
  try{
    if(!config.useRealData) {
      return res.json(dummydata.sample_top_stories)
    }

    let topic = req.query.topic

    let response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${topic}.json?api-key=${config.nyTimesAPIKey}`)
    console.log(response.data.status)
    if (response.data.status === 'OK'){
      let newsArticles = response.data.results.filter((article:any) => article.title);
      for (let i = 0; i < newsArticles.length; i++) {
        newsArticles[i].id = i;
        newsArticles[i].image= newsArticles[i].multimedia?.[0]?.url;
        newsArticles[i].is_favorite = false;
      }
      return res.json(newsArticles);
    }
  } catch (e){
    console.log(e)
    next(e)
  }
})


module.exports = router;
