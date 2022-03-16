"use strict";
const router = require("express").Router();
router.get("/", function (req, res) {
    res.json({ requestBody: addNumbers(1, 2) });
});
function addNumbers(a, b) {
    return a + b;
}
router.post("/", function (req, res) {
    res.json({ requestBody: req.body });
});
module.exports = router;
