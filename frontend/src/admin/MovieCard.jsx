import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      {/* Poster */}
      <img
        src={movie.poster?.url}
        alt={movie.name}
        className="h-56 w-full object-cover"
      />

      {/* Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{movie.name}</h3>

        <p className="text-sm text-gray-500">
          {movie.language?.join(", ")}
        </p>

        <span
          className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
            movie.category === "now"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {movie.category}
        </span>

        {/* Actions */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() =>
              navigate(`/dashboard/editmovie/${movie._id}`)
            }
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(movie._id)}
            className="text-red-600 text-sm font-medium hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
