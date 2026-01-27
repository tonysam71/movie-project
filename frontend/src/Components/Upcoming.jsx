import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Upcoming() {
  const [movies, setMovies] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const visibleMovies = showAll ? movies : movies.slice(0, 4);


  const getdata = async () => {
    try {
      const res = await fetch(
        "/api/movie/getmovies/?category=upcoming"
      );
      const data = await res.json();
      console.log(data.data);

      if (data.success) {
        console.log(data)
        setMovies(Array.isArray(data.data) ? data.data : []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);
  console.log("upcomming",movies)

  return (
  <div className="max-w-7xl mx-auto px-4 py-10 ">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold">Upcoming Movies</h2>

      <button
        onClick={() => setShowAll(!showAll)}
        className="text-blue-600 hover:underline font-medium"
      >
        {showAll ? "Hide All" : "View All"}
      </button>
    </div>

    {/* Movies Grid */}
    <div
      className={`grid gap-6 ${
        showAll
          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          : "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
      }`}
    >
      {visibleMovies.map((movie) => (
        <div
          key={movie._id}
          className="bg-white rounded-xl min-w-[250px] max-w-[250px] shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <Link to={"movie/" + movie.name}>
            <div className="relative">
              <img
                src={movie.poster?.url}
                alt={movie.name}
                className="h-[300px] w-full object-cover"
              />

              <div className="absolute bottom-0 w-full bg-black/70 text-white text-xs px-3 py-2">
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
              <p className="text-gray-500 text-sm">
                {movie.langauge?.join(", ")}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
);
}