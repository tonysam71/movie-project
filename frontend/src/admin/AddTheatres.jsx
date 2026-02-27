import { useState } from "react";
import axios from "axios";

export default function AddTheatres() {
  const [form, setForm] = useState({
    name: "",
    city: "",
    location: "",
    screens: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Theatre image is required");
      return;
    }

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("city", form.city);
    formData.append("location", form.location);
    formData.append("screens", form.screens);

    
    formData.append("image", image);

    try {
      await axios.post(
        "http://localhost:4000/api/theatre/createtheatre",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Theatre created successfully");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create theatre");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6"> Add Theatre</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

        {/* Theatre Name */}
        <input
          type="text"
          name="name"
          placeholder="Theatre Name"
          onChange={handleChange}
          required
          className="border px-4 py-2 rounded"
        />

        {/* City */}
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
          required
          className="border px-4 py-2 rounded"
        />

        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Location / Address"
          onChange={handleChange}
          className="border px-4 py-2 rounded col-span-2"
        />

        {/* Screens */}
        <input
          type="number"
          name="screens"
          placeholder="Number of Screens"
          onChange={handleChange}
          required
          className="border px-4 py-2 rounded"
        />

        {/* Image */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
          className="border px-4 py-2 rounded"
        />

        {/* Submit */}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-2 rounded col-span-2"
        >
          Create Theatre
        </button>
      </form>
    </div>
  );
}
