import { useState } from "react";
import { X } from "lucide-react";

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

  /* ✅ BASE URL FIX (DEV + RENDER) */
  const BASE_URL =
    import.meta.env.PROD
      ? "https://movie-project-903x.onrender.com/api/user"
      : "/api/user";

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
      alert("Login failed");
    }
  };

  /* ---------------- PROFILE ---------------- */
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ MAIN FIX
        },
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.data);
        onClose();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Profile fetch failed");
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

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
      bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-[90%] max-w-[620px]
        rounded-3xl p-6 sm:p-10 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
        >
          <X size={22} />
        </button>

        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <img src="/booking.webp" className="w-32" />
        </div>

        {/* SIGN IN */}
        {mode === "signin" && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-4">
              Sign in
            </h2>

            <input
              placeholder="Email"
              className="border w-full px-4 py-3 rounded-lg mb-3"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="border w-full px-4 py-3 rounded-lg"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={loginUser}
              className="w-full py-3 mt-6 bg-black text-white rounded-lg"
            >
              Login
            </button>

            <p className="text-center mt-4 text-sm">
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

        {/* SIGN UP */}
        {mode === "signup" && !otpMode && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-4">
              Create account
            </h2>

            {[
              ["Full Name", setName],
              ["Email", setEmail],
              ["Password", setPassword, "password"],
              ["Mobile Number", setMobileNumber],
              ["Address", setAddress],
              ["Interest", setInterest],
            ].map(([ph, fn, type], i) => (
              <input
                key={i}
                type={type || "text"}
                placeholder={ph}
                className="border w-full px-4 py-3 rounded-lg mb-3"
                onChange={(e) => fn(e.target.value)}
              />
            ))}

            <button
              onClick={registerUser}
              className="w-full py-3 mt-4 bg-black text-white rounded-lg"
            >
              Sign up
            </button>
          </>
        )}

        {/* OTP */}
        {mode === "signup" && otpMode && (
          <>
            <h2 className="text-xl font-semibold text-center mb-3">
              Enter OTP
            </h2>

            <input
              placeholder="OTP"
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
              onClick={resendOtp}
              className="text-center mt-3 underline cursor-pointer text-sm"
            >
              Resend OTP
            </p>
          </>
        )}
      </div>
    </div>
  );
}
