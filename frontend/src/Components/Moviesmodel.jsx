import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Moviesmodel({ show, onClose }) {
  const [animate, setAnimate] = useState(false);
  const [movies, setMovies] = useState([]);


  const getdata = async () => {
    try {
      const res = await fetch(
        "/api/movie/getmovies?category=now"
      );
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

  useEffect(() => {
    if (show) getdata();
  }, [show]);

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
      className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50
      transition-opacity duration-300 ${
        animate ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-2xl w-[950px] p-8
        transition-transform duration-300 ${
          animate ? "scale-100" : "scale-95"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-6">
          Now Playing
        </h2>

        <div className="grid grid-cols-2 gap-x-16 gap-y-6">
          {movies.length === 0 && (
            <p className="text-gray-500 col-span-2 text-center">
              No movies found
            </p>
          )}

          {movies.map((movie) => (
<Link onClick={onClose} key={movie._id} to={`/movie/${encodeURIComponent(movie.name)}`}>
            <div
              key={movie._id}
              className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
            >
              <img
                src={movie.poster?.url}
                alt={movie.name}
                className="w-14 h-14 rounded-lg object-cover"
              />
              

              <div>
                <h3 className="font-semibold text-sm">
                  {movie.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {movie.cert || "UA"} •{" "}
                  {(movie.langauge || []).join(", ")}
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
