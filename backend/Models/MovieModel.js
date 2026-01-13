const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    releaseDate: { type: Date },
    duration: { type: String },
    genre: [String],
    langauge: [String],
    category: { type: String, enum: ["now", "upcoming"] }, // now / upcoming
    isReleased: { type: Boolean, default: false },
    castNames: [String],
    description: String,
    poster: { filename: String, url: String, _id: false },
    theaters: []
}, { timestamps: true });

const movieModel = mongoose.model("movies", movieSchema);
module.exports = movieModel;
