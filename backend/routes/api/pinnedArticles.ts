import express from "express";
const router = express.Router();
const asyncHandler = require('express-async-handler');
import {Request, Response, NextFunction} from "express";
const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser } = require('../../utils/auth');
const { User, PinnedArticles } = require('../../db/models');

router.get('/',restoreUser,asyncHandler(async function(req: Request,res: Response){
    const {user} = req as any
    let pins = await PinnedArticles.findAll({
        where: {
            userId : user.id
        },
        include: [{model: User}]
    })
    for (let i=0; i<pins.length; i++) {
        pins[i].dataValues.is_favorite = true;
    }
    return res.json(pins);
}))


router.post('/',handleValidationErrors,restoreUser,asyncHandler(async function(req: Request,res: Response){
    const { user } = req as any;
    const article = req.body;
    const pin = await PinnedArticles.create({
        userId : user.id,
        title: article.title,
	    abstract: article.abstract,
	    byline: article.byline,
	    short_url: article.short_url,
	    image: article.image,
	    published_date: article.published_date,
    })

    return res.json(pin);

}))

router.delete('/',handleValidationErrors,restoreUser,asyncHandler(async function(req: Request,res: Response, next: NextFunction){
    const { user } = req as any;
    const article = req.body;
    const pinnedArticle = await PinnedArticles.findOne({
        where: {
            userId : user.id,
            short_url: article.short_url
        }
    })
    if (pinnedArticle) {
        await pinnedArticle.destroy();
        return res.status(204).end();
    } else {
        const err = {
            status: 404
        }
        next(err);
    }
}));

module.exports = router;
