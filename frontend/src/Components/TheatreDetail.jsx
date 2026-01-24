import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function fmtDateLabel(dateStr) {
  const [year, month, day] = dateStr.split("-");
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

function fmtTime(ts) {
  return new Date(ts).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TheatreDetail() {
  const { id } = useParams();

  const [shows, setShows] = useState([]);
  const [theatreInfo, setTheatreInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTheatreShows();
  }, [id]);

  const fetchTheatreShows = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:4000/api/theatre/filtertheatre/${id}`,
      );
      const data = await res.json();
      console.log("API RESPONSE:", data);

      if (!data.success) {
        setShows([]);
        setTheatreInfo(null);
        return;
      }

      // ✅ only valid shows
      const validShows = (data.data || []).filter((s) => s.movie && s.theatre);

      setShows(validShows);

      // ✅ THEATRE INFO (FIXED)
      const theatreObj = validShows.find((s) => typeof s.theatre === "object");

      if (theatreObj) {
        setTheatreInfo(theatreObj.theatre);
      }

      // ✅ DATE LIST
      const dates = Array.from(
        new Set(
          validShows.flatMap((s) =>
            (s.showDates || []).map(
              (d) => new Date(d.date).toISOString().split("T")[0],
            ),
          ),
        ),
      ).sort();

      setSelectedDate(dates[0] || null);
    } catch (err) {
      console.error(err);
      setShows([]);
      setTheatreInfo(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ group by movie
  const moviesGrouped = shows.reduce((acc, s) => {
    const mid = s.movie._id;
    if (!acc[mid]) acc[mid] = { movie: s.movie, shows: [] };
    acc[mid].shows.push(s);
    return acc;
  }, {});

  const allDates = Array.from(
    new Set(
      shows.flatMap((s) =>
        (s.showDates || []).map(
          (d) => new Date(d.date).toISOString().split("T")[0],
        ),
      ),
    ),
  ).sort();

  if (loading) {
    return <p className="mt-28 text-center">Loading...</p>;
  }

  if (!shows.length) {
    return (
      <p className="mt-28 text-center text-gray-500">
        No movies running in this theatre
      </p>
    );
  }

  return (
    <div className="mt-30 px-6 md:px-20 pb-20">
      {/* ===== THEATRE HEADER ===== */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border">
            {theatreInfo?.image?.url ? (
              <img
                src={theatreInfo.image.url}
                alt={theatreInfo.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm font-semibold text-gray-600">Logo</span>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold">{theatreInfo?.name}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {theatreInfo?.location}, {theatreInfo?.city}
            </p>
          </div>
        </div>

        {/* DATE PILLS */}
        <div className="ml-auto flex gap-3 overflow-x-auto">
          {allDates.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDate(d)}
              className={`min-w-[60px] px-3 py-2 rounded-lg border ${
                selectedDate === d ? "bg-black text-white" : "bg-white"
              }`}
            >
              <div className="text-xs">
                {new Date(d).toLocaleDateString("en-IN", {
                  weekday: "short",
                })}
              </div>
              <div className="text-sm font-semibold">{fmtDateLabel(d)}</div>
            </button>
          ))}
        </div>
      </div>

      <hr className="mb-6" />

      {/* ===== MOVIES LIST ===== */}
      <div className="space-y-8">
        {Object.values(moviesGrouped).map((grp) => {
          const timings = grp.shows.flatMap((s) =>
            (s.showDates || []).some(
              (d) =>
                new Date(d.date).toISOString().split("T")[0] === selectedDate,
            )
              ? (s.showTimings || []).map((t) => t)
              : [],
          );

          if (!timings.length) return null;

          return (
            <div key={grp.movie._id} className="bg-white p-4 rounded-lg">
              <div className="flex gap-4">
                <img
                  src={grp.movie.poster?.url}
                  className="w-24 h-32 rounded object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{grp.movie.name}</h3>

                  <div className="flex gap-4 flex-wrap mt-4">
                    {timings.map((t, i) => (
                      <button
                        className="relative group px-8 py-3 border rounded-2xl
             text-yellow-600 font-semibold hover:border-yellow-500"
                      >
                        {fmtTime(t.time)}

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
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <hr className="mb-6 mt-7" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
