const express = require("express");
const router = express.Router();

const {
  register,
  login,
  profile,
  logout,
  dashboardStats,
} = require("../Controllers/AdminController");

const { authAdmin } = require("../Middleware/auth");

// router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", authAdmin, profile);

// ❌ authAdmin mat lagana abhi
router.get("/dashboard-stats", dashboardStats);

module.exports = router;
