import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Upcoming() {
  const [movies, setMovies] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const getdata = async () => {
    try {
      const res = await fetch(
        "http://localhost:4000/api/movie/getmovies?category=upcoming"
      );
      const data = await res.json();
      console.log(data.data);

      if (data.success) {
        setMovies(Array.isArray(data.data) ? data.data : []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Upcoming Movies</h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-blue-600 hover:underline"
        >
          {showAll ? "Hide All" : "View All"}
        </button>
      </div>

      {!showAll && (
        <div className="flex justify-between overflow-x-auto pb-4 w-full">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="min-w-[250px] max-w-[250px] bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <Link to={"movie/" + movie.name}>
                <div className="relative">
                  <img
                    src={movie.poster?.url}
                    className="h-[300px] w-full object-cover"
                  />
                  <div className="absolute bottom-0 w-full bg-black/70 text-white text-sm px-2 py-1">
                    Release:{" "}
                    {new Date(movie.releaseDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">
                    {movie.name}
                  </h3>
                  <p className="text-gray-500"> {movie.langauge?.join(", ")}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {showAll && (
        <div className="flex justify-between overflow-x-auto pb-4 w-full">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="min-w-[250px] max-w-[250px] bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <Link to={"movie/" + movie.name}>
                <div className="relative">
                  <img
                    src={movie.poster?.url}
                    className="h-[300px] w-full object-cover"
                  />
                  <div className="absolute bottom-0 w-full bg-black/70 text-white text-sm px-2 py-1">
                    Release:{" "}
                    {new Date(movie.releaseDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">
                    {movie.name}
                  </h3>
                  <p className="text-gray-500"> {movie.langauge?.join(", ")}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
