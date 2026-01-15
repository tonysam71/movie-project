import { useState } from "react";

export default function ProfileModal({ show, onClose }) {
  const [mode, setMode] = useState("signin"); 

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

    
        {mode === "signin" && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-2">
              Sign in with mobile
            </h2>

            <p className="text-center text-gray-500 mb-6 text-sm">
              We’ll send you a one-time password
            </p>

            <div className="flex items-center gap-2 mb-6">
              <div className="border px-3 py-3 rounded-lg flex items-center gap-2">
                🇮🇳 <span className="text-gray-600">+91</span>
              </div>

              <input
                type="number"
                placeholder="Enter mobile number"
                className="border w-full px-4 py-3 rounded-lg outline-none"
              />
            </div>

            <button className="w-full py-3 bg-black text-white rounded-lg text-lg">
              Continue
            </button>

         
            <p className="text-center text-sm text-gray-600 mt-4">
              New user?{" "}
              <span
                onClick={() => setMode("signup")}
                className="text-black font-medium cursor-pointer underline"
              >
                Sign up
              </span>
            </p>
          </>
        )}

      
        {mode === "signup" && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6">
              Create account
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="border w-full px-4 py-3 rounded-lg outline-none"
              />

              <input
                type="email"
                placeholder="Email"
                className="border w-full px-4 py-3 rounded-lg outline-none"
              />

              <input
                type="password"
                placeholder="Password"
                className="border w-full px-4 py-3 rounded-lg outline-none"
              />

              <input
                type="number"
                placeholder="Mobile Number"
                className="border w-full px-4 py-3 rounded-lg outline-none"
              />

              <input
                type="text"
                placeholder="Address"
                className="border w-full px-4 py-3 rounded-lg outline-none"
              />

              <input
                type="text"
                placeholder="Interest"
                className="border w-full px-4 py-3 rounded-lg outline-none"
              />
            </div>

            <button className="w-full py-3 mt-6 bg-black text-white rounded-lg text-lg">
              Sign up
            </button>

            
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <span
                onClick={() => setMode("signin")}
                className="text-black font-medium cursor-pointer underline"
              >
                Sign in
              </span>
            </p>
          </>
        )}

        <p className="text-center text-gray-400 text-xs mt-6">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
