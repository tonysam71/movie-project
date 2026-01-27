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
  const [shows, setShows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

 
  const getMovie = async () => {
    try {
      const res = await fetch(
        `/api/movie/getmovie/${encodeURIComponent(name)}`
      );
      const data = await res.json();

      if (data.success) {
        setMovie(data.data);
        fetchShows(data.data._id);
      } else {
        setMovie(false);
      }
    } catch (error) {
      setMovie(false);
    }
  };


  const fetchShows = async (movieId) => {
    try {
      const res = await fetch(
        `/api/showmovie/getshow/${movieId}`
      );
      const data = await res.json();
      console.log(data);
      setShows(data.data || []);
    } catch (error) {
      setShows([]);
    }
  };

  useEffect(() => {
    getMovie();
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


  const groupedShows = shows.reduce((acc, show) => {
    const theatreId = show.theatre._id;

    if (!acc[theatreId]) {
      acc[theatreId] = {
        theatre: show.theatre,
        shows: [],
      };
    }

    acc[theatreId].shows.push(show);
    return acc;
  }, {});

  return (
    <>
    
      <div className="w-[90%] mt-[100px] mx-auto">
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
        <div className="bg-gray-100 px-4 py-2 text-sm flex gap-6 mb-6">
          <span>⚫ Available</span>
          <span className="text-yellow-500">🟡 Filling fast</span>
          <span className="text-orange-500">🟠 Almost full</span>
        </div>

        {Object.keys(groupedShows).length === 0 && (
          <p className="text-center text-gray-500 py-10">No shows available</p>
        )}

        {Object.values(groupedShows).map(({ theatre, shows }) => (
          <div
            key={theatre._id}
            className="border-b py-6 flex justify-between items-start"
          >
            <div className="flex gap-4">
              <img
                src={theatre.logo || "/vite.svg"}
                className="w-12 h-12 rounded-full border"
              />

              <div>
                <h3 className="font-semibold text-lg">
                  {theatre.name}, {theatre.location}
                </h3>

                <p className="text-gray-500 text-sm">| Non-cancellable</p>

               
                <div className="flex gap-3 mt-4 flex-wrap">
                  {shows.map((show) =>
                    show.showDates.map((d, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedDate(d.date)}
                        className={`px-4 py-2 border rounded-lg text-sm
          ${
            selectedDate === d.date
              ? "bg-green-600 text-white border-green-600"
              : "hover:border-green-500"
          }`}
                      >
                        {new Date(d.date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </button>
                    ))
                  )}
                </div>

                {selectedDate && (
                  <div className="flex gap-4 mt-4 flex-wrap">
                    {shows.map((show) =>
                      show.showTimings.map((t, i) => (
                        <button
                          key={i}
                          className="relative group border rounded-lg px-6 py-3 hover:border-green-500"
                        >
                          <p className="font-semibold">
                            {new Date(t.time).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>

                          {/* Hover Popup */}
                          <div
                            className="absolute hidden group-hover:block
          top-[-130px] left-1/2 -translate-x-1/2
          bg-white rounded-xl shadow-xl p-4 z-50 min-w-[200px]"
                          >
                            {t.seatCategories.map((seat, idx) => (
                              <div
                                key={idx}
                                className="flex justify-between mb-2"
                              >
                                <div>
                                  <p className="text-sm">{seat.categoryName}</p>
                                  <p className="text-xs text-green-600">
                                    AVAILABLE
                                  </p>
                                </div>
                                <p className="font-semibold">₹{seat.price}</p>
                              </div>
                            ))}

                            <div
                              className="absolute -bottom-2 left-1/2 -translate-x-1/2
            w-3 h-3 bg-white rotate-45"
                            ></div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                )}
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
