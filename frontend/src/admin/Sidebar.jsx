import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkStyle =
    "p-3 rounded-lg transition-all duration-300 text-gray-300 hover:bg-gray-700 hover:text-white";

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">🎬 Admin Panel</h1>

      <nav className="flex flex-col gap-4">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `${linkStyle} ${isActive && "bg-blue-600 text-white"}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="addmovie"
          className={({ isActive }) =>
            `${linkStyle} ${isActive && "bg-blue-600 text-white"}`
          }
        >
          Add Movie
        </NavLink>

        <NavLink
          to="allmovies"
          className={({ isActive }) =>
            `${linkStyle} ${isActive && "bg-blue-600 text-white"}`
          }
        >
          All Movies
        </NavLink>

        <NavLink
          to="addtheatre"
          className={({ isActive }) =>
            `${linkStyle} ${isActive && "bg-blue-600 text-white"}`
          }
        >
          Add Theatre
        </NavLink>

        <NavLink
          to="createshow"
          className={({ isActive }) =>
            `${linkStyle} ${isActive && "bg-blue-600 text-white"}`
          }
        >
          Create Show
        </NavLink>
      </nav>
       <div className="shadow p-4 flex items-center">
    

          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              window.location.href = "/loginadmin";
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

    </div>
  );
}
