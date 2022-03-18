const express = require('express')
const router = express.Router();
const axios = require("axios")
const config = require('../../config')
const dummydata = require('./dummydata')
import {Request, Response} from "express";

router.get("/topstories", async(req: Request, res: Response, next: any) => {
  console.log("nyTimesAPIKey", config.nyTimesAPIKey)
  try{
    if(config.useRealData !== 'true') {
      return res.json(dummydata.sample_top_stories)
    }

    let response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${config.nyTimesAPIKey}`)
    console.log(response.data.status)
    if (response.data.status === 'OK'){
      return res.json(response.data.results) // the response object has a result array which what we need
    }
  } catch (e){
    console.log(e)
    next(e)
  }
})


module.exports = router;
