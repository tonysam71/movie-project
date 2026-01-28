const Movie = require("../Models/MovieModel");

let createMovie = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Poster is required",
      });
    }

    const poster = {
  filename: req.file.filename,
  url: `${process.env.BASEURL}/uploads/${req.file.filename}`,
};


    const releaseDate = req.body.releaseDate
      ? new Date(req.body.releaseDate)
      : new Date();

    const today = new Date();

    const category = releaseDate <= today ? "now" : "upcoming";

    const newMovie = new Movie({
      ...req.body,
      releaseDate,
      poster,
      category,
      isReleased: category === "now",
    });

    await newMovie.save();

    res.json({
      success: true,
      message: "Movie Created Successfully",
      data: newMovie,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

let getMovies = async (req, res) => {
  try {
    const { category } = req.query;
    const today = new Date();

    let filter = {};

    if (category === "now") {
      filter.releaseDate = { $lte: today };
    }

    if (category === "upcoming") {
      filter.releaseDate = { $gt: today };
    }

    const movies = await Movie.find(filter).sort({ releaseDate: 1 });

    res.json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
let getMovie = async (req, res) => {
  try {
    let { name } = req.params;

    let decodedName = decodeURIComponent(name);

    let movie = await Movie.findOne({ name: decodedName });

    if (!movie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }

    res.status(200).json({ success: true, message: "found", data: movie });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

let updateMovie = async (req, res) => {
  try {
    const { id } = req.params;

    let updateData = { ...req.body };

    // agar naya poster aaya ho
    if (req.file) {
  updateData.poster = {
    filename: req.file.filename,
    url: `${process.env.BASEURL}/uploads/${req.file.filename}`,
  };
}


    if (updateData.releaseDate) {
      const releaseDate = new Date(updateData.releaseDate);
      const today = new Date();
      updateData.category = releaseDate <= today ? "now" : "upcoming";
      updateData.isReleased = updateData.category === "now";
    }

    const movie = await Movie.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!movie) {
      return res.json({ success: false, message: "Movie not found" });
    }

    res.json({
      success: true,
      message: "Movie Updated Successfully",
      data: movie,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

let deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findByIdAndDelete(id);

    if (!movie) {
      return res.json({ success: false, message: "Movie not found" });
    }

    res.json({
      success: true,
      message: "Movie Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

let FilterMovie = async (req, res) => {
  try {
    let { key, value } = req.params;

    let valuesArray = value.split(",");

    let movies = await Movie.find({
      [key]: { $in: valuesArray },
    });

    if (movies.length === 0) {
      return res.json({
        success: false,
        message: "No movies found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Movies found",
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createMovie,
  getMovies,
  getMovie,
  updateMovie,
  deleteMovie,
  FilterMovie,
};
