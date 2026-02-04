import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MovieSection({ section, title, filter }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const fetchMovies = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`/api/movie/filtermovie-query`, {
        params: {
          section,
          language: filter.language,
          genre: filter.genre,
        },
      });

      setMovies(data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [filter, section]);

  const visibleMovies =
    section === "upcoming" && !showAll ? movies.slice(0, 4) : movies;

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h2 className="text-2xl font-semibold">{title}</h2>

          {section === "upcoming" && movies.length > 4 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-blue-600 hover:underline font-medium mt-2 sm:mt-0"
            >
              {showAll ? "Hide All" : "View All"}
            </button>
          )}
        </div>

        {loading && <p className="text-center">Loading...</p>}

        {!loading && movies.length === 0 && (
          <p className="text-gray-500 text-center"> No movies found</p>
        )}

        {/* MOVIE GRID */}
        <div
          className={`grid gap-4 sm:gap-6 ${
            section === "upcoming"
              ? showAll
                ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                : "grid-cols-2 sm:grid-cols-2 md:grid-cols-4"
              : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          }`}
        >
          {visibleMovies.map((movie) => (
            <div
              key={movie._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <Link to={`/movie/${encodeURIComponent(movie.name)}`}>
                <div className="w-full overflow-hidden rounded-t-xl relative">
                  <img
                    src={movie.poster?.url}
                    alt={movie.name}
                    className="w-full h-full object-cover"
                  />

                  {section === "upcoming" && movie.releaseDate && (
                    <p
                      className="absolute bottom-2 left-2 text-xs sm:text-sm font-medium
                  bg-black/70 text-white px-2 py-1 rounded"
                    >
                      Releasing on: {formatDate(movie.releaseDate)}
                    </p>
                  )}
                </div>
              </Link>

              <div className="p-3 sm:p-4">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold truncate">
                  {movie.name}
                </h3>

                <p className="text-gray-500 text-xs sm:text-sm">
                  {movie.language?.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
