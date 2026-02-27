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
      url: process.env.BASEURL + req.file.filename,
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
    const { slug } = req.params;

    

    const movie = await Movie.findOne({ slug });

    if (!movie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }

    res.json({ success: true, data: movie });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


let updateMovie = async (req, res) => {
  try {
    const { id } = req.params;

    let updateData = { ...req.body };

    if (updateData.name) {
  let slug = updateData.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");

  const slugExists = await Movie.findOne({ slug, _id: { $ne: id } });

  if (slugExists) {
    slug = `${slug}-${Date.now()}`;
  }

  updateData.slug = slug;
}


    // poster update
    if (req.file) {
      updateData.poster = {
        filename: req.file.filename,
        url: process.env.BASEURL + req.file.filename,
      };
    }

    // releaseDate logic
    if (updateData.releaseDate) {
      const releaseDate = new Date(updateData.releaseDate);
      const today = new Date();
      updateData.category = releaseDate <= today ? "now" : "upcoming";
      updateData.isReleased = updateData.category === "now";
    }

    const movie = await Movie.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
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

 const filterMovieQuery = async (req, res) => {
  try {
    const { section, language, genre } = req.query;

    let query = {};

    if (section) {
      query.category = section;
    }

    if (language) {
      query.language = new RegExp(`^${language}$`, "i"); // case-insensitive
    }

    if (genre) {
      query.genre = new RegExp(`^${genre}$`, "i"); // case-insensitive
    }

    console.log("Mongo Query:", query);

    const movies = await Movie.find(query).sort({ releaseDate: 1 });

    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

let getlang = async (req, res) => {
    try {
        let movies = await Movie.find().distinct("language");
        res.json({ success: true, message: "Movie Get Successfully", data: movies })
 
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}
 

let getgenre = async (req, res) => {
  try {
    const { genre } = req.query;
    const today = new Date();

    let filter = {};

    if (genre === "now") {
      filter.releaseDate = { $lte: today };
    }

    if (genre === "upcoming") {
      filter.releaseDate = { $gt: today };
    }

        let movies = await Movie.find().distinct("genre");

    res.json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

getSingleMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      success: true,
      data: movie, // 👈 IMPORTANT
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


searchMovies = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    const movies = await Movie.find({
      name: { $regex: q, $options: "i" },
    })
      .select("name language slug poster")
      .limit(10);

    res.status(200).json({
      success: true,
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
filterMovieQuery,
getlang,
getgenre,
getSingleMovie,
searchMovies,

};
