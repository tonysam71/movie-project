import React, { useEffect, useState } from "react";
import Moviesmodel from "./Moviesmodel";
import Profilemodal from "./Profilemodal";
import Searchmodal from "./Searchmodal";
import { NavLink, useNavigate } from "react-router-dom";
import Theatres from "./Theatres";

export default function Navbar() {
  const [movie, setMovie] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theatreOpen, setTheatreOpen] = useState(false);

  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile(token);
    }
  }, []);


  const fetchProfile = async (token) => {
    try {
      const res = await fetch("http://localhost:4000/api/user/profile", {
        headers: { token },
      });

      const data = await res.json();

      if (data.data) {
        setUser(data.data);
      } else {
        logout();
      }
    } catch (err) {
      logout();
    }
  };


  // const logout = () => {
  //   localStorage.removeItem("token");
  //   setUser(null);
  //   navigate("/");
  // };

  return (
    <>
      <header className="w-full border border-gray-400 fixed top-0 left-0 z-50 bg-white">
        <nav className="w-full bg-white px-6 md:px-16 py-4 flex items-center justify-between">
          
         
          <NavLink to="/">
            <img src="/booking.webp" className="w-32" alt="logo" />
          </NavLink>

       
          <ul className="hidden md:flex gap-8 text-gray-700 font-medium items-center">
            <NavLink to="/">Home</NavLink>

            <span onMouseEnter={() => setMovie(true)} className="cursor-pointer">
              Movies
            </span>

            <span
              onMouseEnter={() => setTheatreOpen(true)}
              className="cursor-pointer"
            >
              Theatres
            </span>

          
            <span
              className="cursor-pointer"
              onClick={() => {
                if (!user) {
                  setOpen(true); 
                } else {
                  navigate("/orders");
                }
              }}
            >
              Orders
            </span>
          </ul>

        
          <div
            className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-full gap-2"
            onClick={() => setSearchOpen(true)}
          >
            <input
              type="text"
              placeholder="Search for movies, cinemas..."
              className="bg-transparent outline-none text-sm"
            />
          </div>

         
          <div className="ml-4 cursor-pointer">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
                  {user.name[0].toUpperCase()}
                </div>
                {/* <button
                  onClick={logout}
                  className="text-sm text-red-500"
                >
                  Logout
                </button> */}
              </div>
            ) : (
              <div
                onClick={() => setOpen(true)}
                className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center"
              >
                👤
              </div>
            )}
          </div>
        </nav>
      </header>

    
      <Moviesmodel show={movie} onClose={() => setMovie(false)} />
      <Theatres show={theatreOpen} onClose={() => setTheatreOpen(false)} />

      <Profilemodal
        show={open}
        onClose={() => setOpen(false)}
        setUser={setUser}
      />

      <Searchmodal show={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
