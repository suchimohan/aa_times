const router = require("express").Router();
import {Request, Response} from "express";

router.get("/", function (req: Request, res: Response) {
  res.json({ requestBody: addNumbers(1,2)});
});

function addNumbers(a: number, b: number) { 
    return a + b; 
}

router.post("/", function (req: Request, res: Response) {
  res.json({ requestBody: req.body });
});

module.exports = router;
