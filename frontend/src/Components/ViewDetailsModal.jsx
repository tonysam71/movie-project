import { useEffect, useState } from "react";

export default function ViewDetailsModal({ movieName, onClose }) {
  const [movie, setMovie] = useState(null);
  const [activeTab, setActiveTab] = useState("Reviews");

  useEffect(() => {
    fetch("/api/movie/getmovie/" + movieName)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMovie(data.data);
        else setMovie(false);
      });
  }, [movieName]);

  if (!movie) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm
                 z-50 flex items-center justify-center
                 px-3 sm:px-6"
      onClick={onClose}
    >
      {/* MODAL */}
      <div
        className="bg-white w-full max-w-[900px]
                   rounded-xl sm:rounded-2xl
                   p-4 sm:p-6
                   relative
                   max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          className="absolute top-3 sm:top-4 right-3 sm:right-4
                     text-lg sm:text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        {/* HEADER */}
        <h2 className="text-lg sm:text-xl font-bold mb-1">
          Movie details
        </h2>
        <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">
          {movie.name}
        </p>

        {/* TABS */}
        <div className="flex gap-4 sm:gap-6
                        border-b mb-4 sm:mb-6
                        overflow-x-auto">
          {["Reviews", "Synopsis", "Cast", "Videos", "Posters"].map((tab) => (
            <span
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer pb-2 whitespace-nowrap transition
                ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {tab}
            </span>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className="relative overflow-hidden min-h-[120px] sm:min-h-[150px]">
          <div key={activeTab} className="animate-slideUp">
            {activeTab === "Reviews" && (
              <p className="text-sm sm:text-base text-gray-700">
                Reviews coming soon...
              </p>
            )}

            {activeTab === "Synopsis" && (
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {movie.description}
              </p>
            )}

            {activeTab === "Cast" && (
              <p className="text-sm sm:text-base text-gray-700">
                Cast coming soon...
              </p>
            )}

            {activeTab === "Videos" && (
              <p className="text-sm sm:text-base text-gray-700">
                Videos coming soon...
              </p>
            )}

            {activeTab === "Posters" && (
              <p className="text-sm sm:text-base text-gray-700">
                Posters coming soon...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
