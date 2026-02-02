import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function ProfileModal({ show, onClose, setUser }) {
  const [mode, setMode] = useState("signin");
  const [otpMode, setOtpMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [interest, setInterest] = useState("");
  const [otp, setOtp] = useState("");

  const BASE_URL = "/api/user";

  /* ---------------- AUTO LOGIN ON MOUNT ---------------- */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile(token);
    }
  }, []);

  /* ---------------- PROFILE FETCH ---------------- */
  const fetchProfile = async (tokenParam) => {
    const token = tokenParam || localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!data.success) {
        localStorage.removeItem("token");
        alert("Session expired, please login again");
        return;
      }

      setUser(data.data);
      onClose();
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
    }
  };

  /* ---------------- LOGIN ---------------- */
  const loginUser = async () => {
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.success) return alert(data.message);

      localStorage.setItem("token", data.token);
      await fetchProfile();
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------- SIGNUP ---------------- */
  const registerUser = async () => {
    try {
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
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------- VERIFY OTP ---------------- */
  const verifyOtp = async () => {
    try {
      const res = await fetch(`${BASE_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!data.success) return alert(data.message);

      localStorage.setItem("token", data.token);
      await fetchProfile();
      setMode("signin"); // Back to login mode
      setOtpMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------- RESEND OTP ---------------- */
  const resendOtp = async () => {
    try {
      await fetch(`${BASE_URL}/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      alert("OTP resent");
    } catch (err) {
      console.error(err);
    }
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-[90%] max-w-[620px] rounded-3xl p-6 sm:p-10 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X size={22} />
        </button>

        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <img src="/booking.webp" className="w-32 sm:w-36" alt="logo" />
        </div>

        {/* ---------------- SIGN IN ---------------- */}
        {mode === "signin" && !otpMode && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-2">Sign in</h2>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="border w-full px-4 py-3 rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="border w-full px-4 py-3 rounded-lg"
                value={password}
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
            <h2 className="text-2xl font-semibold text-center mb-6">Create account</h2>
            <div className="space-y-4">
              <input
                placeholder="Full Name"
                className="border w-full px-4 py-3 rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                placeholder="Email"
                className="border w-full px-4 py-3 rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder="Password"
                type="password"
                className="border w-full px-4 py-3 rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                placeholder="Mobile Number"
                className="border w-full px-4 py-3 rounded-lg"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <input
                placeholder="Address"
                className="border w-full px-4 py-3 rounded-lg"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                placeholder="Interest"
                className="border w-full px-4 py-3 rounded-lg"
                value={interest}
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
            <h2 className="text-xl font-semibold text-center mb-4">Enter OTP</h2>
            <input
              placeholder="Enter OTP"
              className="border w-full px-4 py-3 rounded-lg"
              value={otp}
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
