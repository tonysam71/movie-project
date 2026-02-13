const { hashpassword, comparepassword } = require("../utils/hash");
const { generatetoken } = require("../utils/token");
const Admin = require("../models/AdminModel");


// ================= REGISTER =================
let register = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
    }

    let existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin already exists",
      });
    }

    let hashed = await hashpassword(password);

    let newAdmin = await Admin.create({
      name,
      email,
      password: hashed,
    });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= LOGIN =================
let login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    let ismatch = await comparepassword(password, admin.password);

    if (!ismatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    let token = await generatetoken(
      { adminId: admin._id },
      process.env.SECRETKEY,
      "1d"
    );

    res.status(200).json({
      success: true,
      message: "Login successfully",
      token,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= PROFILE =================
let profile = (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      data: req.admin,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= LOGOUT =================
let logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};


module.exports = { register, login, profile, logout };
