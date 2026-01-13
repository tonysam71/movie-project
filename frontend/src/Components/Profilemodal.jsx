export default function ProfileModal({ show, onClose }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition 
      ${show ? "visible bg-black/40 backdrop-blur-sm" : "invisible opacity-0"}`}
      onClick={onClose}
    >
      <div
        className={`bg-white w-[480px] md:w-[620px] rounded-3xl p-10 shadow-lg relative 
        transition-transform duration-700 ease-in-out
        ${show ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
     
        

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="/booking.webp" className="w-40" alt="" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-2">
          Enter your mobile number
        </h2>

        <p className="text-center text-gray-500 mb-6 text-sm">
          If you don’t have an account yet, we’ll create one for you
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

        <p className="text-center text-gray-500 text-xs mt-4">
          By continuing, you agree to our <span className="underline">Terms of Service</span> & <span className="underline">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
