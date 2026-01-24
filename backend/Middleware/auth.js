const MovieUser = require("../Models/movieuserModel");
const { decodetoken } = require("../utils/token");

let auth = async (req, res, next) => {
  try {
    let token = req.headers.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token required"
      });
    }

    let decoded = await decodetoken(token, process.env.SECRETKEY);

    let user = await MovieUser.findById(decoded.userid)
      .select("name email mobileNumber");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { auth };
