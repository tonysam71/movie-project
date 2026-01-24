const mongoose = require("mongoose");
 
const showSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movies"
  },
  theatre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theatre"
  },
  showDates: [{ date: Date ,_id:false}],  // 2026-01-08
  showTimings: [{
    time: Date,
    seatCategories: [{ categoryName: String, price: Number ,_id:false }],
    _id:false
  }], // 12:15 PM
  totalSeats: Number,
  bookedSeats: Number,
 
}, { timestamps: true });
 
module.exports = mongoose.model("shows", showSchema);
 
 