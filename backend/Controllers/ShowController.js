const Show = require("../Models/ShowModel_temp");
const Theatre = require("../Models/theatreModel_temp");
let {ObjectId} = require("mongodb")
exports.createShow = async (req, res) => {
    try {
        let newShow = await Show({ ...req.body });
        newShow.save()
        res.status(200).json({ success: true, data: newShow })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
exports.getShows = async (req, res) => {
    try {
        let { movieId } = req.params;
        let newShow = await Show.find({"movie":movieId}).populate("theatre")
        res.status(200).json({ success: true, data: newShow })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
 