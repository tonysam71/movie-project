const { ObjectId } = require("mongodb");
const MovieUser = require('../Models/movieuserModel')
const { decodetoken } = require("../utils/token");

let auth = async (req, res, next) => {
    try {
        let token = req.headers.token || null;

        if (!token) {
            return res.status(500).json({ success: false, message: "Please provide token" })
        }
        let decodedvalue = await decodetoken(token, process.env.SECRETKEY);
        let user = await MovieUser.findById(decodedvalue.userid).select(["name", "email"])
        console.log(user)
        req.user = user;
        next()
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = { auth }



// install the mongoose driver - npm i mongoose
// then connect the db using the  mongoose.connect(url with db name) method
//  then call the db function in the index.js file on the top
//the create the model and schema for your collection to be validate ,
// and then use the model to add and delete data from the database 