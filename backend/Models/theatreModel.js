const mongoose = require("mongoose");
const theatreSchema = new mongoose.Schema({
    name: String,
    city: String,
    location: String,
    screens: Number,
}, { timestamps: true });
let theatreModel = mongoose.model("Theatre", theatreSchema);
module.exports = theatreModel;
