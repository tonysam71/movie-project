import { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";


export default function Dash() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    movies: 0,
    theatres: 0,
    shows: 0,
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/admin/dashboard-stats"
        );

        setStats({
          movies: res.data.movies,
          theatres: res.data.theatres,
          shows: res.data.shows,
        });
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="mt-20 text-center text-lg">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 mt-16 gap-6">
      {/* Movies */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold">Total Movies</h3>
       <p className="text-3xl mt-2 font-bold text-blue-600">
  <CountUp end={stats.movies} duration={1.5} />
</p>

      </div>

      {/* Theatres */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold">Total Theatres</h3>
       <p className="text-3xl mt-2 font-bold text-green-600">
  <CountUp end={stats.theatres} duration={1.5} />
</p>
      </div>

      {/* Shows */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold">Total Shows</h3>
       <p className="text-3xl mt-2 font-bold text-purple-600">
  <CountUp end={stats.shows} duration={1.5} />
</p>
      </div>
    </div>
  );
}
