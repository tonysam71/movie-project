const Seat = require("../Models/SeatModel");
const Show = require("../Models/ShowModel_temp");

exports.createSeatsForShow = async (showId) => {
  const show = await Show.findById(showId);

  for (let dateObj of show.showDates) {
    for (let timingObj of show.showTimings) {

      let seatArray = [];

      // simple logic: 50 seats generate
      for (let i = 1; i <= show.totalSeats; i++) {
        seatArray.push({
          seatNumber: `S${i}`,
          category: "Regular",
        });
      }

      await Seat.create({
        show: showId,
        date: dateObj.date,
        time: timingObj.time,
        seats: seatArray,
      });
    }
  }
};

exports.getSeats = async (req, res) => {
  try {
    let { showId, date, time } = req.params;

    // 🔥 Decode first
    date = decodeURIComponent(date);
    time = decodeURIComponent(time);

    console.log("Decoded:", date, time);

    const seatData = await Seat.findOne({
      show: showId,
      date: new Date(date),
      time: new Date(time),
    });

    if (!seatData) {
      return res.status(404).json({
        success: false,
        message: "Seats not found",
      });
    }

    res.json({ success: true, data: seatData });

  } catch (error) {
    console.log("BACKEND ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.bookSeats = async (req, res) => {
  try {
    const { showId, date, time, seatNumbers } = req.body;

    const seatDoc = await Seat.findOne({
      show: showId,
      date: new Date(date),
      time: new Date(time),
    });

    for (let seatNum of seatNumbers) {
      const seat = seatDoc.seats.find(
        (s) => s.seatNumber === seatNum
      );

      if (!seat || seat.isBooked) {
        return res.status(400).json({
          success: false,
          message: `Seat ${seatNum} already booked`,
        });
      }

      seat.isBooked = true;
    }

    await seatDoc.save();

    res.json({
      success: true,
      message: "Seats Booked Successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};