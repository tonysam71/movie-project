const Theatre = require("../Models/theatreModel_temp");
const Show = require("../Models/ShowModel_temp");

let createTheatre = async (req, res) => {
  try {
    let image = {
      filename: req.files["image"][0].filename,
      url: `${process.env.BASEURL}/uploads/${req.files["image"][0].filename}`,
    };

    let newTheatre = new Theatre({ ...req.body, image });
    await newTheatre.save();

    res.json({
      success: true,
      message: "Theatre Created Successfully",
      data: newTheatre,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

let getTheatre = async (req, res) => {
  try {
    let theatres = await Theatre.find({});
    res.status(200).json({ success: true, data: theatres });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

let updateTheatre = async (req, res) => {
  try {
    let { id } = req.params;

    let theatre = await Theatre.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!theatre) {
      return res
        .status(404)
        .json({ success: false, message: "Theatre not found" });
    }

    res.status(200).json({ success: true, data: theatre });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

let deleteTheatre = async (req, res) => {
  try {
    let { id } = req.params;
    await Theatre.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Theatre deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

let filterTheatre = async (req, res) => {
  try {
    let { id } = req.params;

    let theatres = await Show.find({ theatre: id })
      .populate("movie")
      .populate("theatre");

    res.status(200).json({
      success: true,
      data: theatres,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  filterTheatre,
  createTheatre,
  getTheatre,
  updateTheatre,
  deleteTheatre,
};
