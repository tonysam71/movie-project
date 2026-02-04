import React, { useEffect, useState } from "react";
import Moviesmodel from "./Moviesmodel";
import Profilemodal from "./Profilemodal";
import Searchmodal from "./Searchmodal";
import { NavLink, useNavigate } from "react-router-dom";
import Theatres from "./Theatres";
import { Menu, X } from "lucide-react";
import Userprofile from "./Userprofile";

export default function Navbar() {
  const [movie, setMovie] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theatreOpen, setTheatreOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);


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
      const res = await fetch("/api/user/profile", {
        headers: { token },
      });

      const data = await res.json();

      if (data.data) {
        setUser(data.data);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    }
  };

  return (
    <>
      {/* HEADER */}
      <header className="w-full border border-gray-300 fixed top-0 left-0 z-50 bg-white">
        <nav className="w-full px-4 sm:px-6 md:px-16 py-3 md:py-4 flex items-center justify-between">
          
          {/* LOGO */}
          <NavLink to="/">
            <img src="/booking.webp" className="w-28 md:w-32" alt="logo" />
          </NavLink>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex gap-8 text-gray-700 font-medium items-center">
            <NavLink to="/">Home</NavLink>

            <span
              onMouseEnter={() => setMovie(true)}
              className="cursor-pointer"
            >
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

          {/* DESKTOP SEARCH */}
          <div
            className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-full gap-2 cursor-pointer"
            onClick={() => setSearchOpen(true)}
          >
            <input
              type="text"
              placeholder="Search for movies, cinemas..."
              className="bg-transparent outline-none text-sm"
            />
          </div>

          {/* PROFILE + MOBILE MENU */}
          <div className="flex items-center gap-3">
            {/* PROFILE */}
           {user ? (
  <div
    onClick={() => setProfileOpen(true)}
    className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-semibold cursor-pointer"
  >
    {user.name[0].toUpperCase()}
  </div>
) : (

              <div
                onClick={() => setOpen(true)}
                className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
              >
                👤
              </div>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden"
            >
              {mobileMenu ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </nav>

        {/* MOBILE MENU */}
        {mobileMenu && (
          <div className="md:hidden bg-white border-t px-6 py-4 space-y-4">
            <NavLink
              to="/"
              onClick={() => setMobileMenu(false)}
              className="block font-medium"
            >
              Home
            </NavLink>

            <span
              onClick={() => {
                setMovie(true);
                setMobileMenu(false);
              }}
              className="block font-medium cursor-pointer"
            >
              Movies
            </span>

            <span
              onClick={() => {
                setTheatreOpen(true);
                setMobileMenu(false);
              }}
              className="block font-medium cursor-pointer"
            >
              Theatres
            </span>

            <span
              onClick={() => {
                if (!user) {
                  setOpen(true);
                } else {
                  navigate("/orders");
                }
                setMobileMenu(false);
              }}
              className="block font-medium cursor-pointer"
            >
              Orders
            </span>

            <div
              className="bg-gray-100 px-4 py-2 rounded-full"
              onClick={() => {
                setSearchOpen(true);
                setMobileMenu(false);
              }}
            >
              <input
                type="text"
                placeholder="Search movies..."
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>
          </div>
        )}
      </header>

      {/* MODALS */}
      <Moviesmodel show={movie} onClose={() => setMovie(false)} />
      <Theatres show={theatreOpen} onClose={() => setTheatreOpen(false)} />

      <Profilemodal
        show={open}
        onClose={() => setOpen(false)}
        setUser={setUser}
      />

      <Searchmodal show={searchOpen} onClose={() => setSearchOpen(false)} />
         <Userprofile
  show={profileOpen}
  onClose={() => setProfileOpen(false)}
  user={user}
  setUser={setUser}
/>
    </>
  );
}
