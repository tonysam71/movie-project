import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Moviesmodel({ show, onClose }) {
  const [animate, setAnimate] = useState(false);
  const [movies, setMovies] = useState([]);

  // FETCH MOVIES
  const getdata = async () => {
    try {
      const res = await fetch("/api/movie/getmovies?category=now");
      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        setMovies(data.data);
      } else {
        setMovies([]);
      }
    } catch (error) {
      setMovies([]);
    }
  };

  // LOAD DATA WHEN MODAL OPENS
  useEffect(() => {
    if (show) getdata();
  }, [show]);

  // ANIMATION
  useEffect(() => {
    if (show) {
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm
      flex items-center justify-center z-50
      transition-opacity duration-300
      ${animate ? "opacity-100" : "opacity-0"}`}
    >
      {/* MODAL */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl sm:rounded-2xl
        w-full max-w-[950px]
        mx-3 sm:mx-6
        p-4 sm:p-6 lg:p-8
        transition-transform duration-300
        ${animate ? "scale-100" : "scale-95"}`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
            Now Playing
          </h2>

          <button
            onClick={onClose}
            className="text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* MOVIES LIST */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2
          gap-x-8 gap-y-4
          max-h-[65vh] overflow-y-auto pr-1"
        >
          {movies.length === 0 && (
            <p className="text-gray-500 col-span-full text-center">
              No movies found
            </p>
          )}

          {movies.map((movie) => (
            <Link
              key={movie._id}
              to={`/movie/${movie.slug}`}   
              onClick={onClose}
            >
              <div
                className="flex items-center gap-4
                hover:bg-gray-50 p-2 rounded-lg
                transition cursor-pointer"
              >
                <img
                  src={
                    movie.poster?.url || movie.poster || "/placeholder.jpg"
                  }  
                  alt={movie.name}
                  className="w-12 h-12 sm:w-14 sm:h-14
                  rounded-lg object-cover"
                />

                <div>
                  <h3 className="font-semibold text-sm sm:text-base truncate">
                    {movie.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-500">
                    {Array.isArray(movie.language)
                      ? movie.language.join(", ")
                      : movie.language || ""}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}