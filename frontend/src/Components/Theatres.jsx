import { useEffect, useState } from "react";

export default function TheatresModal({ show, onClose }) {
  const [animate, setAnimate] = useState(false);
  const [theatres, setTheatres] = useState([]);

  useEffect(() => {
    if (show) {
      setAnimate(true);
      fetchTheatres();
    } else {
      setAnimate(false);
    }
  }, [show]);

  const fetchTheatres = async () => {
    try {
      const res = await fetch(
        "http://localhost:4000/api/theatre/gettheatres"
      );
      const result = await res.json();

      
      setTheatres(result.data || []);
    } catch (error) {
      
      setTheatres([]);
    }
  };

  if (!show) return null;

  return (
    <div
      onClick={onClose}
      className={`
        fixed inset-0 bg-black/40
        flex items-start justify-center
        z-50 transition duration-300
        ${animate ? "opacity-100" : "opacity-0"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white w-[900px] mt-24
          rounded-xl p-8
          transition duration-500
          ${animate ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
      >
        <h2 className="text-xl font-semibold mb-6">
          Theatres in Indore
        </h2>

        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
          {theatres.length > 0 ? (
            theatres.map((theatre) => (
              <div
                key={theatre._id}
                className="py-3 border-b text-gray-700 hover:text-red-600 cursor-pointer transition"
              >
                {theatre.name && <span>{theatre.name}</span>}
                {theatre.name && theatre.location && <span>, </span>}
                {theatre.location && <span>{theatre.location}, </span>}
                {theatre.city && <span>{theatre.city}</span>}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No theatres found</p>
          )}
        </div>
      </div>
    </div>
  );
}
