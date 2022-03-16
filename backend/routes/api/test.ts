const router = require("express").Router();

router.get("/", function (req: any, res: any) {
  res.json({ requestBody: addNumbers(1,2)});
});

function addNumbers(a: number, b: number) { 
    return a + b; 
}

router.post("/", function (req: any, res: any) {
  res.json({ requestBody: req.body });
});

module.exports = router;
