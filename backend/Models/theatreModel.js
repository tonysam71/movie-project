const mongoose = require("mongoose");
const theatreSchema = new mongoose.Schema({
    name: { type: String },
    city: { type: String },
    location: String,
    screens: Number,
    image: { filename: String, url: String, _id: false }
}, { timestamps: true });
let theatreModel = mongoose.model("Theatre", theatreSchema);
module.exports = theatreModel;

