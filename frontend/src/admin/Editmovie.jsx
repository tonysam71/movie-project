import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [poster, setPoster] = useState(null);

  const [form, setForm] = useState({
    name: "",
    duration: "",
    releaseDate: "",
    genre: "",
    language: "",
    description: "",
  });

  // 🔹 fetch movie
  const fetchMovie = async () => {
  try {
    const res = await axios.get(
      `http://localhost:4000/api/movie/getmovie/${id}`
    );

    console.log("FULL RESPONSE 👉", res.data);

    const m = res.data.data || res.data.movie || res.data;

    setForm({
      name: m?.name || "",
      duration: m?.duration || "",
      releaseDate: m?.releaseDate
        ? m.releaseDate.split("T")[0]
        : "",
      genre: m?.genre ? m.genre.join(", ") : "",
      language: m?.language ? m.language.join(", ") : "",
      description: m?.description || "",
    });
  } catch (error) {
    console.log(error);
    alert("Failed to load movie");
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchMovie();
  }, []);

  // 🔹 submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("duration", form.duration);
      fd.append("releaseDate", form.releaseDate);
      fd.append("description", form.description);
      fd.append("genre", form.genre);
      fd.append("language", form.language);

      if (poster) fd.append("poster", poster);

      await axios.put(
        `http://localhost:4000/api/movie/updatemovie/${id}`,
        fd
      );

      alert("Movie updated successfully");
      navigate("/dashboard/allmovies");
    } catch (error) {
      alert("Update failed");
      console.log(error);
    }
  };

  if (loading) return <p>Loading movie...</p>;

  return (
    <div className="max-w-3xl bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Edit Movie</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Movie Name */}
        <input
          className="border p-2 rounded col-span-2"
          placeholder="Movie Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
        />

        {/* Duration */}
        <input
          className="border p-2 rounded"
          placeholder="Duration (e.g. 2h 30m)"
          value={form.duration}
          onChange={(e) =>
            setForm({ ...form, duration: e.target.value })
          }
        />

        {/* Release Date */}
        <input
          type="date"
          className="border p-2 rounded"
          value={form.releaseDate}
          onChange={(e) =>
            setForm({ ...form, releaseDate: e.target.value })
          }
        />

        {/* Genre */}
        <input
          className="border p-2 rounded col-span-2"
          placeholder="Genre (comma separated)"
          value={form.genre}
          onChange={(e) =>
            setForm({ ...form, genre: e.target.value })
          }
        />

        {/* Language */}
        <input
          className="border p-2 rounded col-span-2"
          placeholder="Language (comma separated)"
          value={form.language}
          onChange={(e) =>
            setForm({ ...form, language: e.target.value })
          }
        />

        {/* Description */}
        <textarea
          className="border p-2 rounded col-span-2"
          placeholder="Description"
          rows="4"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        {/* Poster */}
        <div className="col-span-2">
          <label className="block text-sm mb-1">
            Replace Poster (optional)
          </label>
          <input
            type="file"
            onChange={(e) => setPoster(e.target.files[0])}
          />
        </div>

        {/* Actions */}
        <div className="col-span-2 flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Update Movie
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-300 px-6 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
