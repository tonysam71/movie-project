const Admin = require("../Models/AdminModel");
const Movie = require("../Models/MovieModel");
const Theatre = require("../Models/theatreModel_temp");
const Show = require("../Models/ShowModel_temp");

const { hashpassword, comparepassword } = require("../utils/hash");
const { generatetoken } = require("../utils/token");

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ success: false, message: "Admin already exists" });
    }

    const hashed = await hashpassword(password);

    await Admin.create({ name, email, password: hashed });

    res.status(201).json({ success: true, message: "Admin registered" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    const isMatch = await comparepassword(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = await generatetoken(
      { adminId: admin._id },
      process.env.SECRETKEY,
      "1d"
    );

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= PROFILE =================
exports.profile = (req, res) => {
  res.status(200).json({ success: true, data: req.admin });
};

// ================= LOGOUT =================
exports.logout = (req, res) => {
  res.status(200).json({ success: true, message: "Logout successful" });
};

// ================= DASHBOARD STATS =================
exports.dashboardStats = async (req, res) => {
  try {
    const movies = await Movie.countDocuments();
    const theatres = await Theatre.countDocuments();
    const shows = await Show.countDocuments();

    res.status(200).json({
      success: true,
      movies,
      theatres,
      shows,
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
