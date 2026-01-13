import { useEffect, useState } from "react";

export default function ViewDetailsModal({ movieName, onClose }) {
  const [movie, setMovie] = useState(null);
  const [activeTab, setActiveTab] = useState("Reviews");

  useEffect(() => {
    fetch("http://localhost:4000/api/movie/getmovie/" + movieName)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMovie(data.data);
        else setMovie(false);
      });
  }, [movieName]);

  if (!movie) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
     
      <div
        className="bg-white w-[900px] rounded-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
       
        <button
          className="absolute top-4 right-4 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-1">Movie details</h2>
        <p className="text-gray-500 mb-6">{movie.name}</p>

        
        <div className="flex gap-6 border-b mb-6">
          {["Reviews", "Synopsis", "Cast", "Videos", "Posters"].map((tab) => (
            <span
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer pb-2 transition
                ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500"
                }`}
            >
              {tab}
            </span>
          ))}
        </div>

   
        <div className="relative overflow-hidden min-h-[150px]">
          <div
            key={activeTab}
            className="animate-slideUp"
          >
            {activeTab === "Reviews" && <p>Reviews</p>}
            {activeTab === "Synopsis" && (
              <p className="text-gray-700">{movie.description}</p>
            )}
            {activeTab === "Cast" && <p>Cast coming soon...</p>}
            {activeTab === "Videos" && <p>Videos coming soon...</p>}
            {activeTab === "Posters" && <p>Posters coming soon...</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
