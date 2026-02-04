import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function Userprofile({ show, onClose, user, setUser }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    onClose();
    navigate("/");
  };

  return (
    <>
      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity ${
          show ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white z-50
        transform transition-transform duration-300
        ${show ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="flex items-center gap-3 p-4 border-b">
          <button onClick={onClose}>
            <X />
          </button>
          <h2 className="text-lg font-semibold">Profile</h2>
        </div>

        {/* USER INFO */}
        <div className="flex items-center gap-4 p-4">
          <div className="w-14 h-14 rounded-full bg-purple-200 flex items-center justify-center text-xl font-bold">
            {user?.name?.[0]?.toUpperCase()}
          </div>

          <div>
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm text-gray-500">+91 {user?.mobileNumber}</p>
          </div>
        </div>

        {/* OPTIONS */}
        <div className="px-4 space-y-3">
          <button
            onClick={() => {
              navigate("/orders");
              onClose();
            }}
            className="w-full text-left p-3 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            View all bookings
          </button>

          <div className="pt-4">
            <p className="text-sm text-gray-400 mb-2">Support</p>

            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-100">
              Frequently Asked Questions
            </button>

            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-100">
              Contact Us
            </button>
          </div>

          <div className="pt-4">
            <button
              onClick={logout}
              className="w-full text-left p-3 rounded-lg text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
     
    </>
    
  );
}
