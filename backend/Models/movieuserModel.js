let mongoose = require("mongoose");
let validator = require("validator")

let movieuserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, min: 2, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobileNumber: Number,
    otp: String,
    otpExpiry: String,
    address: String,
    interest: String,
    isVerified: { type: Boolean, default: false }
}, { timestamps: true })

let movieusermodel = mongoose.model("movieusers", movieuserSchema)
module.exports = movieusermodel;