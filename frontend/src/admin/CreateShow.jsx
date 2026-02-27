import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateShow() {
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);

  const [form, setForm] = useState({
    movie: "",
    theatre: "",
    showDate: "",
    showTime: "",
    totalSeats: "",
    price: "",
  });


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const movieRes = await axios.get("http://localhost:4000/api/movie/getmovies");
    const theatreRes = await axios.get("http://localhost:4000/api/theatre/gettheatres");

    setMovies(movieRes.data.data);
    setTheatres(theatreRes.data.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const showDateTime = new Date(`${form.showDate}T${form.showTime}`);


   const payload = {
  movie: form.movie,
  theatre: form.theatre,
  showDates: [{ date: new Date(form.showDate) }],
  showTimings: [
    {
      time: showDateTime,
      seatCategories: [
        { categoryName: "Normal", price: Number(form.price) },
      ],
    },
  ],
  totalSeats: Number(form.totalSeats),
  bookedSeats: 0,
};


    try {
      await axios.post(
        "http://localhost:4000/api/showmovie/createshow",
        payload
      );

      toast.success("Show Created Successfully");
      setForm({
        movie: "",
        theatre: "",
        showDate: "",
        showTime: "",
        totalSeats: "",
        price: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create show");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Create Show</h2>

      <form onSubmit={submitHandler} className="space-y-4">
        {/* Movie */}
        <select
          name="movie"
          value={form.movie}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Movie</option>
          {movies.map((m) => (
            <option key={m._id} value={m._id}>
              {m.name}
            </option>
          ))}
        </select>

        {/* Theatre */}
        <select
          name="theatre"
          value={form.theatre}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Theatre</option>
          {theatres.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name} ({t.city})
            </option>
          ))}
        </select>

        {/* Date */}
        <input
          type="date"
          name="showDate"
          value={form.showDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Time */}
        <input
          type="time"
          name="showTime"
          value={form.showTime}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Seats */}
        <input
          type="number"
          name="totalSeats"
          placeholder="Total Seats"
          value={form.totalSeats}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Ticket Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
          Create Show
        </button>
      </form>
    </div>
  );
}
