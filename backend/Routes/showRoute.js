let router = require("express").Router();
let { createShow, getShows } = require("../Controllers/ShowController");
 
router.post("/createshow", createShow);
router.get("/getshow/:movieId", getShows);
// router.get("/getshow/:name", getShow);
 
module.exports = router
 