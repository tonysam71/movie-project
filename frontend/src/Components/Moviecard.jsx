import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function Moviecard() {
  const { type, value } = useParams();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      setLoading(true);

      const params = {};
      if (type === "Language") params.language = value;
      if (type === "category") params.genre = value;

      const { data } = await axios.get(
        "/api/movie/filtermovie-query",
        { params }
      );

      setMovies(data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [type, value]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">
        {value} Movies
      </h2>

      {loading && <p className="text-center">Loading...</p>}

      {!loading && movies.length === 0 && (
        <p className="text-center text-gray-500">
          No movies found
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
           <Link to={`/movie/${movie.slug}`}
            className="bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={movie.poster?.url}
              alt={movie.name}
              className="w-full h-64 object-cover rounded-t-xl"
            />

            <div className="p-3">
              <h3 className="font-semibold truncate">
                {movie.name}
              </h3>

              <p className="text-sm text-gray-500">
                {movie.language?.join(", ")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
