const { ObjectId } = require("mongodb");
const MovieUser = require("../Models/movieuserModel");
const { decodetoken } = require("../utils/token");
let Admin = require("../Models/AdminModel")


let authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Token required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decodedvalue = await decodetoken(
      token,
      process.env.SECRETKEY
    );

    console.log("Decoded:", decodedvalue);

    const admin = await Admin.findById(decodedvalue.adminId);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.admin = admin;
    next();

  } catch (error) {
    console.log("AuthAdmin Error:", error);
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
let auth = async (req, res, next) => {
    try {
        let token = req.headers.token || null;
        // let token = req.headers.authorization.split(" ")[1] || null
 
        if (!token) {
            return res.status(500).json({ success: false, message: "Please provide token" })
        }
        let decodedvalue = await decodetoken(token, process.env.SECRETKEY);
        let user = await MovieUser.findOne({ "_id": new ObjectId(decodedvalue.userid) })
        req.user = user;
        next()
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
 
module.exports = { auth,authAdmin};
