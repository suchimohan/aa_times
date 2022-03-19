import express from "express";
const router = express.Router();
const asyncHandler = require('express-async-handler');
import {Request, Response} from "express";
const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser } = require('../../utils/auth');
const { User, PinnedArticles } = require('../../db/models');

router.get('/',restoreUser,asyncHandler(async function(req: Request,res: Response){
    const {user} = req as any
    const pins = await PinnedArticles.findAll({
        where: {
            userId : user.id
        },
        include: [{model: User}]
    })
    return res.json(pins);
}))


router.post('/',handleValidationErrors,restoreUser,asyncHandler(async function(req: Request,res: Response){
    const { user } = req as any;
    const article = req.body
    const pin = await PinnedArticles.create({
        userId : user.id,
        title: article.title,
	    abstract: article.abstract,
	    byline: article.byline,
	    short_url: article.short_url,
	    image: article.image,
	    published_date: article.published_date,
    })

    const pinnedArticle = await PinnedArticles.findAll({
        where: {
            id : pin.id
        },
        include: [{model: User}]
    })

    return res.json(pinnedArticle)

}))


module.exports = router;
