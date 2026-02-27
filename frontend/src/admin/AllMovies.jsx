import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../admin/MovieCard";
import { Link } from "react-router-dom";

export default function AllMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/movie/getmovies"
      );
      setMovies(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMovie = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      await axios.delete(
        `http://localhost:4000/api/movie/deletemovie/${id}`
      );
      setMovies(movies.filter((m) => m._id !== id));
    } catch (error) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">All Movies</h2>

        <Link
          to="/dashboard/addmovie"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Movie
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <p>Loading movies...</p>
      ) : movies.length === 0 ? (
        <p className="text-gray-500">No movies found</p>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onDelete={deleteMovie}
            />
          ))}
        </div>
      )}
    </div>
  );
}
