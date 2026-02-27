import { useState } from "react";
import axios from "axios";

export default function AddMovie() {
  const [form, setForm] = useState({
    name: "",
    releaseDate: "",
    duration: "",
    genre: "",
    language: "",
    castNames: "",
    description: "",
  });

  const [poster, setPoster] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("releaseDate", form.releaseDate);
    formData.append("duration", form.duration);

   
    form.genre.split(",").forEach(g => formData.append("genre[]", g.trim()));
    form.language.split(",").forEach(l => formData.append("language[]", l.trim()));
    form.castNames.split(",").forEach(c => formData.append("castNames[]", c.trim()));

    formData.append("description", form.description);
    formData.append("poster", poster); 

    try {
      await axios.post(
        "http://localhost:4000/api/movie/createmovie",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Movie created successfully");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create movie");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Add Movie</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

        <input
          type="text"
          name="name"
          placeholder="Movie Name"
          onChange={handleChange}
          required
          className="border px-4 py-2 rounded"
        />

        <input
          type="date"
          name="releaseDate"
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />

        <input
          type="text"
          name="duration"
          placeholder="2h 30m"
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPoster(e.target.files[0])}
          className="border px-4 py-2 rounded"
          required
        />

        <input
          type="text"
          name="genre"
          placeholder="Action, Drama"
          onChange={handleChange}
          className="border px-4 py-2 rounded col-span-2"
        />

        <input
          type="text"
          name="language"
          placeholder="Hindi, English"
          onChange={handleChange}
          className="border px-4 py-2 rounded col-span-2"
        />

        <input
          type="text"
          name="castNames"
          placeholder="Actor1, Actor2"
          onChange={handleChange}
          className="border px-4 py-2 rounded col-span-2"
        />

        <textarea
          name="description"
          placeholder="Movie description"
          onChange={handleChange}
          rows="4"
          className="border px-4 py-2 rounded col-span-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded col-span-2"
        >
          Create Movie
        </button>
      </form>
    </div>
  );
}
