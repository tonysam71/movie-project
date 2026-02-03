const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    releaseDate: { type: Date },
    duration: { type: String },

    genre: [String],        // action, biography etc
    language: [String],     // English, Hindi

    category: {
      type: String,
      enum: ["now", "upcoming"], // section
    },

    isReleased: { type: Boolean, default: false },
    castNames: [String],
    description: String,

    poster: {
      filename: String,
      url: String,
      _id: false,
    },

    theaters: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("movies", movieSchema);
