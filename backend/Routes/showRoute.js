let router = require("express").Router();
let { createShow, getShows, getShow } = require("../Controllers/showController");

router.post("/createshow", createShow);
router.get("/getshows", getShows);
router.get("/getshow/:name", getShow);

module.exports = router;
