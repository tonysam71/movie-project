const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movies",
    },
    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theatre",
    },
    showDates: [{ date: Date, _id: false }],
    showTimings: [
      {
        time: Date,
        seatCategories: [
          { categoryName: String, price: Number, _id: false },
        ],
        _id: false,
      },
    ],
    totalSeats: Number,
    bookedSeats: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("show", showSchema);
