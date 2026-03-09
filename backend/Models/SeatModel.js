const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    show: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "show",
    },
    date: Date,
    time: Date,
    seats: [
      {
        seatNumber: String,
        category: String,
        isBooked: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seat", seatSchema);