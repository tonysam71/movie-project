import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SearchModal({ show, onClose }) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);

      fetch(`/api/movie/search?q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setMovies(data.data);
          else setMovies([]);
        })
        .finally(() => setLoading(false));
    }, 400); // debounce

    return () => clearTimeout(timer);
  }, [query]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition
      ${show ? "visible bg-black/40 backdrop-blur-sm" : "invisible opacity-0"}`}
      onClick={onClose}
    >
      <div
        className={`bg-white w-[520px] md:w-[720px] rounded-3xl p-6 shadow-lg relative
        transition-transform duration-500
        ${show ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          Search Movies
        </h2>

        {/* SEARCH INPUT */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="w-full border rounded-xl px-4 py-3 mb-5 outline-none"
        />

        {/* LOADING */}
        {loading && (
          <p className="text-center text-sm text-gray-500">
            Searching...
          </p>
        )}

        {/* RESULTS */}
        <div className="grid grid-cols-2 gap-4">
          {movies.map((movie) => (
            <Link
              key={movie._id}
              to={`/movie/${movie.slug}`}   
              onClick={onClose}             
              className="flex items-center gap-3 cursor-pointer
                         hover:bg-gray-50 p-2 rounded-xl transition"
            >
              {/* IMAGE */}
              <img
                src={movie.poster?.url || "/placeholder.jpg"}
                alt={movie.name}
                className="w-12 h-16 object-cover rounded-lg"
              />

              {/* TEXT */}
              <div>
                <p className="font-medium text-sm">{movie.name}</p>
                <p className="text-xs text-gray-500">Movie</p>
              </div>
            </Link>
          ))}
        </div>

        {/* EMPTY */}
        {!loading && query && movies.length === 0 && (
          <p className="text-center text-sm text-gray-500 mt-4">
            No movies found
          </p>
        )}
      </div>
    </div>
  );
}