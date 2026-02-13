const express = require("express");
const router = express.Router();
const {register, login, profile, logout } = require("../Controllers/AdminController.js")
const { authAdmin } = require("../Middleware/auth.js")
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", authAdmin, profile);
module.exports = router;
 
 
 