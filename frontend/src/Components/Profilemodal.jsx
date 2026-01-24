import { useState } from "react";

export default function ProfileModal({ show, onClose, setUser }) {
  const [mode, setMode] = useState("signin");
  const [otpMode, setOtpMode] = useState(false);

  // signin
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // signup
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [interest, setInterest] = useState("");

  // otp
  const [otp, setOtp] = useState("");

  const BASE_URL = "http://localhost:4000/api/user";

  /* ---------------- LOGIN ---------------- */
  const loginUser = async () => {
  const res = await fetch("http://localhost:4000/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!data.success) {
    alert(data.message);
    return;
  }

  
  localStorage.setItem("token", data.token);

 
  fetchProfile();
};

  /* ---------------- PROFILE ---------------- */
  const fetchProfile = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:4000/api/user/profile", {
    headers: {
      token: token   
    },
  });

  const data = await res.json();

  if (data.success) {
    setUser(data.data); 
    onClose();         
  }
};


  /* ---------------- SIGNUP ---------------- */
  const registerUser = async () => {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        mobileNumber, 
        address,
        interest,
      }),
    });

    const data = await res.json();
    if (!data.success) return alert(data.message);

    alert("OTP sent to email");
    setOtpMode(true);
  };

  /* ---------------- VERIFY OTP ---------------- */
  const verifyOtp = async () => {
    const res = await fetch(`${BASE_URL}/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();
    if (!data.success) return alert(data.message);

    alert("Account verified, please login");
    setOtpMode(false);
    setMode("signin");
  };

  /* ---------------- RESEND OTP ---------------- */
  const resendOtp = async () => {
    await fetch(`${BASE_URL}/resend-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    alert("OTP resent");
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center
      ${show ? "visible bg-black/40 backdrop-blur-sm" : "invisible opacity-0"}`}
      onClick={onClose}
    >
      <div
        className="bg-white w-[480px] md:w-[620px] rounded-3xl p-10 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="/booking.webp" className="w-36" alt="" />
        </div>

        {/* ---------------- SIGN IN ---------------- */}
        {mode === "signin" && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-2">
              Sign in
            </h2>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="border w-full px-4 py-3 rounded-lg"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="border w-full px-4 py-3 rounded-lg"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={loginUser}
              className="w-full py-3 mt-6 bg-black text-white rounded-lg text-lg"
            >
              Login
            </button>

            <p className="text-center text-sm mt-4">
              New user?{" "}
              <span
                onClick={() => setMode("signup")}
                className="underline cursor-pointer"
              >
                Sign up
              </span>
            </p>
          </>
        )}

        {/* ---------------- SIGN UP ---------------- */}
        {mode === "signup" && !otpMode && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6">
              Create account
            </h2>

            <div className="space-y-4">
              <input
                placeholder="Full Name"
                className="border w-full px-4 py-3 rounded-lg"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                placeholder="Email"
                className="border w-full px-4 py-3 rounded-lg"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder="Password"
                type="password"
                className="border w-full px-4 py-3 rounded-lg"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                placeholder="Mobile Number"
                className="border w-full px-4 py-3 rounded-lg"
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <input
                placeholder="Address"
                className="border w-full px-4 py-3 rounded-lg"
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                placeholder="Interest"
                className="border w-full px-4 py-3 rounded-lg"
                onChange={(e) => setInterest(e.target.value)}
              />
            </div>

            <button
              onClick={registerUser}
              className="w-full py-3 mt-6 bg-black text-white rounded-lg text-lg"
            >
              Sign up
            </button>
          </>
        )}

        {/* ---------------- OTP ---------------- */}
        {mode === "signup" && otpMode && (
          <>
            <h2 className="text-xl font-semibold text-center mb-4">
              Enter OTP
            </h2>

            <input
              placeholder="Enter OTP"
              className="border w-full px-4 py-3 rounded-lg"
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={verifyOtp}
              className="w-full py-3 mt-4 bg-black text-white rounded-lg"
            >
              Verify OTP
            </button>

            <p
              className="text-center mt-3 underline cursor-pointer text-sm"
              onClick={resendOtp}
            >
              Resend OTP
            </p>
          </>
        )}
      </div>
    </div>
  );
}
