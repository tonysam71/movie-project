import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VeiwDetailsModal from "./ViewDetailsModal";

const languages = [
  "Hindi Movies",
  "English Movies",
  "Telugu Movies",
  "Tamil Movies",
  "Kannada Movies",
  "Bengali Movies",
  "Bhojpuri Movies",
  "Malayalam Movies",
  "Odia Movies",
];

const genres = [
  "Comedy Movies",
  "Action Movies",
  "Drama Movies",
  "Romance Movies",
  "Horror Movies",
  "Thriller Movies",
  "Crime Movies",
  "Mystery Movies",
  "Biography Movies",
];

const nowShowing = [
  "Tere Ishk Mein",
  "Dhurandhar",
  "De De Pyaar De 2",
  "Zootopia 2",
  "Mastiii 4",
  "120 Bahadur",
];

export default function MovieDetails() {
    const { name } = useParams(); 
  const [movie, setMovie] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [theatres, setTheatres] = useState([]);
  const [open, setOpen] = useState(false);

   const getMovie = async () => {
    try {
     
      const res = await fetch(
        `http://localhost:4000/api/movie/getmovie/${encodeURIComponent(name)}`
      );
      const data = await res.json();

      if (data.success) {
        setMovie(data.data); 
      } else {
        setMovie(false); 
      }
    } catch (error) {
      console.log(error);
      setMovie(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovie();
    window.scrollTo(0, 0); 
  }, [name]);

  

  const fetchTheatres = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/theatre/gettheatres");
      const data = await res.json();

      setTheatres(data.data || []);
    } catch (error) {
      setTheatres([]);
    }
  };

  useEffect(() => {
    getMovie();
    fetchTheatres();
    window.scrollTo(0, 0);
  }, [name]);

  if (movie === null) {
    return <h2 className="text-center text-2xl font-bold py-20">Loading...</h2>;
  }

  if (movie === false) {
    return (
      <h2 className="text-center text-2xl font-bold py-20">Movie Not Found!</h2>
    );
  }

  return (
    <>
      <div className="w-[90%]  mt-[100px] mx-auto p-1 ">
        <div className="flex gap-9 mb-14">
          <img
            src={movie.poster?.url}
            alt={movie.name}
            className="w-[300px] h-[400px] object-cover rounded-xl shadow-lg"
          />

          <div>
            <h1 className="text-2xl font-bold mb-2">{movie.name}</h1>

            <p className="text-gray-500">
              {(movie.langauge || []).join(", ")} | {movie.duration}
            </p>

            <button
              onClick={() => setOpen(true)}
              className="border px-3 py-1 mt-3 rounded-lg hover:bg-gray-100"
            >
              View details
            </button>

            {open && (
              <VeiwDetailsModal
                movieName={movie.name}
                onClose={() => setOpen(false)}
              />
            )}
            <br />
            <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg text-lg hover:bg-red-700">
              Book Tickets
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-10 lg:px-20">
        <div className="flex items-center gap-3 mb-4">
          <button className="border px-4 py-2 rounded">Filters</button>
          <button className="border px-4 py-2 rounded">3D</button>
          <button className="border px-4 py-2 rounded">After 5 PM</button>
          <button className="border px-4 py-2 rounded">Premium Seats</button>
        </div>

        <div className="bg-gray-100 px-4 py-2 text-sm flex gap-6 mb-6">
          <span>⚫ Available</span>
          <span className="text-yellow-500">🟡 Filling fast</span>
          <span className="text-orange-500">🟠 Almost full</span>
        </div>

        {theatres.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No theatres available
          </p>
        )}

        {theatres.map((theatre) => (
          <div
            key={theatre._id}
            className="border-b py-6 flex justify-between items-start"
          >
            <div className="flex gap-4">
              <img
                src={theatre.logo || "/vite.svg"}
                alt=""
                className="w-12 h-12 rounded-full border"
              />

              <div>
                <h3 className="font-semibold text-lg">
                  {theatre.name}, {theatre.location}
                </h3>

                <p className="text-gray-500 text-sm">| Non-cancellable</p>

                <div className="flex gap-4 mt-4 flex-wrap">
                  {(theatre.shows || []).map((show, i) => (
                    <button
                      key={i}
                      className="border rounded-lg px-6 py-3 hover:border-green-500"
                    >
                      <p className="font-semibold">{show.time}</p>
                      <p className="text-xs text-gray-500">{show.format}</p>
                      <p className="text-xs text-gray-400">{show.type}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-xl cursor-pointer">🤍</div>
          </div>
        ))}
        <h2 className="text-xl font-semibold mt-10 mb-4">
          Explore Latest Movies in Indore by Language
        </h2>
        <div className="flex gap-3 flex-wrap mb-10">
          {languages.map((lang, i) => (
            <span
              key={i}
              className="px-5 py-2 rounded-full border bg-white hover:bg-gray-100 cursor-pointer"
            >
              {lang}
            </span>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">
          Explore Latest Movies in Indore by Genre
        </h2>
        <div className="flex gap-3 flex-wrap mb-10">
          {genres.map((genre, i) => (
            <span
              key={i}
              className="px-5 py-2 rounded-full border bg-white hover:bg-gray-100 cursor-pointer"
            >
              {genre}
            </span>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">Now Showing in Indore</h2>
        <div className="flex gap-3 flex-wrap">
          {nowShowing.map((movie, i) => (
            <span
              key={i}
              className="px-5 py-2 rounded-full border bg-white hover:bg-gray-200 cursor-pointer"
            >
              {movie}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
