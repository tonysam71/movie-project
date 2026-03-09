const router = require("express").Router();
const { getSeats, bookSeats } = require("../Controllers/SeatController");

router.get("/getseats/:showId/:date/:time", getSeats);
router.post("/bookseats", bookSeats);

module.exports = router;