const router = require("express").Router();
const { register, verifyOtp, resendOtp, login, profile } = require("../Controllers/movieuserController.js")
let { auth } = require("../Middleware/auth.js")
router.post("/register", register);
router.post("/verify-otp", verifyOtp)
router.post("/resend-otp", resendOtp)
router.post("/login", login);
router.get("/profile", auth, profile);

module.exports = router

// otp , passhash ,passcompare