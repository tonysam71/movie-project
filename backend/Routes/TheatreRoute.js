let router = require("express").Router();
let { createTheatre ,getTheatre } = require("../Controllers/TheatreController");

router.post("/createtheatre", createTheatre);
router.get("/gettheatres", getTheatre);

module.exports = router