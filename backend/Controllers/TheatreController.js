let Theatre = require("../Models/theatreModel");

let createTheatre = async (req, res) => {
    try {
        let newtheatre = await Theatre({ ...req.body });
        console.log("REQ BODY 👉", req.body);

        await newtheatre.save();
        res.json({ success: true, message: "theatre Created Successfully", data: newtheatre })
    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }
}
let getTheatre = async (req, res) => {
    try {
        let theatres = await Theatre.find({});
        res.status(200).json({ success: true, data: theatres })
    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }
}

// let getTheatresByCity = async (req, res) => {
//     const { city } = req.query;
//     const theatres = await Theatre.find({ city });
//     res.json(theatres);
// };
module.exports = { createTheatre, getTheatre }