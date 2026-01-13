let Theatre = require("../Models/theatreModel")
let createTheatre = async (req, res) => {
    let newtheatre = await Theatre({ ...req.body, });
    await newtheatre.save();
    res.json({ success: true, message: "theatre Created Successfully", data: newtheatre })
}
let getTheatres = async (req, res) => {
    try {
        let theatres = await Theatre.find();
        res.json({ success: true, message: "theatre Get Successfully", data: theatres })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

let getTheatre = async (req, res) => {
    try {
        let { name } = req.params;
        let theatre = await Theatre.findOne({ name });
        if (!theatre) {
            return res.json({ success: false, message: "theatre not found" })
        }
        res.status(200).json({ success: true, message: "found", data: theatre })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
// create show (admin)
exports.createShow = async (req, res) => {
    const show = await Show.create(req.body);
    res.status(201).json(show);
};
module.exports = { createTheatre, getTheatres, getTheatre }