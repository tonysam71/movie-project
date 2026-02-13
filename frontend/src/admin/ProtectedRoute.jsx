import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setAuth(false);
        setLoading(false);
        return;
      }

      try {
        await axios.get("http://localhost:4000/api/admin/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAuth(true);
      } catch (error) {
        localStorage.removeItem("token"); // invalid token remove
        setAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Checking Authentication...
      </div>
    );
  }

  return auth ? <Outlet /> : <Navigate to="/loginadmin" replace />;
}
