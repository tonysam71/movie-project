import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Now() {
  const [movies, setMovies] = useState([]);

  const getdata = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/movie/getmovies?category=now");
      const data = await res.json();
      console.log(data.data)

      if (data.success) {
        setMovies(Array.isArray(data.data)?data.data:[]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);
  useEffect(() => {
    getdata();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 ">
      <h2 className="text-2xl font-semibold mb-6">
        Now Showing in Indore
      </h2>

      
      <div className="flex gap-3 flex-wrap mb-8">
        {["Filters", "Top Selling", "English", "Hindi", "Romance", "Drama", "3D"]
          .map((item, i) => (
            <button
              key={i}
              className="px-4 py-2 rounded-full border
              hover:bg-black hover:text-white hover:shadow hover:border-black"
            >
              {item}
            </button>
          ))}
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-white rounded-xl shadow-sm min-w-[250px] max-w-[250px]
            overflow-hidden hover:shadow-lg transition"
          >
            <Link to={`/movie/${encodeURIComponent(movie.name)}`}>
              <div className="relative min-w-[250px] max-w-[250px]">
                <img
                  src={movie.poster?.url}
                  alt={movie.name}
                  className="h-[300px] w-full object-cover"
                />
              </div>
            </Link>

            <div className="p-4 d-flax">
              <h3 className="text-lg font-semibold truncate">
                {movie.name}
              </h3>
       <p className="text-gray-500 text-sm">
                {movie.langauge?.join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
