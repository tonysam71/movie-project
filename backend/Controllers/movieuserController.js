let bcrypt = require("bcrypt");
let { hashpassword, comparepassword } = require("../utils/hash");
const otp = require("../utils/otp");
const { generatetoken } = require("../utils/token");
const { sendEmail } = require("../utils/mail");
let MovieUser = require("../Models/movieuserModel")
let register = async (req, res) => {

    try {
        let { name, email, password, mobileNumber, address, interest } = req.body;
        if (!name || !email || !password || !mobileNumber || !address || !interest) {
            return res.status(500).json({ success: false, message: "Please provide all the details" })
        }
        let hashed = await hashpassword(password)
        let newotp = otp();
        let expiretime = Date.now() + 10 * 60 * 1000;
        await sendEmail(email, "verification otp", "check this " + newotp, `<!DOCTYPE html>
        <html>

        <head>
            <title>Email Newsletter</title>
            <link rel="important stylesheet" href="chrome://messagebody/skin/messageBody.css">
            <style>
                body {
                    padding: 10px;
                    background: grey;
                    color: white;
                    margin: 10px;
                    border: solid black;
                }
            </style>
        </head>

        <body>
            <h1> HERE is your otp: ${newotp}</h1>
        </body>

        </html>`)

        let newuser = await MovieUser({
            name,
            email,
            password: hashed,
            mobileNumber,
            address,
            interest,
            otp: newotp,
            otpExpiry: expiretime,
            isVerified: false,
            createdAt: Date.now()
        });
        await newuser.save()
        res.status(201).json({ success: true, message: "User Registered successfully", data: newuser })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
let resendOtp = async (req, res) => {
    try {

        let { email } = req.body;
        let user = await MovieUser.findOne({ email });
        if (!user) {
            return res.status(500).json({ success: false, message: "User not found" })
        }
        let newotp = otp();
        let exprietime = Date.now() + 10 * 60 * 1000;
        await sendEmail(email, " new verification otp", "check this " + newotp, `<!DOCTYPE html>
<html>

<head>
    <title>Email Newsletter</title>
    <link rel="important stylesheet" href="chrome://messagebody/skin/messageBody.css">
    <style>
        body {
            padding: 10px;
            background: grey;
            color: white;
            margin: 10px;
            border: solid black;
        }
    </style>
</head>

<body>
    <h1> HERE is your new  otp: ${newotp}</h1>
</body>

</html>`)
        await MovieUser.updateOne(
            { email },
            { "$set": { otp: newotp, otpExpiry: exprietime } }
        )
        res.status(200).json({ success: true, message: "otp send successfully" })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
let verifyOtp = async (req, res) => {
    try {

        let { email, otp } = req.body;
        let user = await MovieUser.findOne({ email });
        if (!user) {
            return res.status(500).json({ success: false, message: "User not found" })
        }
        if (otp != user.otp || user.otpExpiry < Date.now()) {
            return res.status(500).json({ success: false, message: "invalid otp" })
        } else {
            await MovieUser.findOneAndUpdate(
                { email },
                { isVerified: true, otp: "", otpExpiry: "" }
            )
            res.status(200).json({ success: true, message: "User verified successfully" })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}



let login = async (req, res) => {
    try {

        let { email, password } = req.body;

        let user = await MovieUser.findOne({ email });
        if (!user || !user.isVerified) {
            return res.status(500).json({ success: false, message: "User not found or not verified" })
        }
        let ismatch = await comparepassword(password, user.password);
        if (!ismatch) {
            return res.status(500).json({ success: false, message: "please provide valid credentials" })
        }
        let token = await generatetoken({ userid: user._id }, process.env.SECRETKEY, '1d')
        res.status(200).json({ success: true, message: "login  successfully", token: token })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
let profile = (req, res) => {
    try {
        if (!req.user) {
            return res.status(500).json({ success: false, message: "not found" })
        }
        res.send({ data: req.user })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

let deleteuser = async (req, re) => {
    try {

        let { id } = req.params();
        await MovieUser.findByIdAndDelete(id)

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
module.exports = { register, resendOtp, verifyOtp, login, profile }


// ORM (Object-Relational Mapping) and ODM (Object-Document Mapping) are techniques that bridge the gap between object-oriented programming languages and databases, allowing developers to interact with data using code objects instead of writing raw queries. The key difference lies in the type of database they are designed for.
// ORM is used for relational databases (SQL databases) like MySQL, PostgreSQL, and SQLite.
// ODM is used for NoSQL document databases like MongoDB and CouchDB. 