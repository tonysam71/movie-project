import React, { useState } from "react";
import Moviesmodel from "./Moviesmodel";
import Profilemodal from "./Profilemodal";
import Searchmodal from "./Searchmodal";
import { NavLink } from "react-router-dom";
import Theatres from "./Theatres";



export default function Navbar() {
  const [movie, setMovie] = useState(false);
   const [open, setOpen] = useState(false);
     const [searchOpen, setSearchOpen] = useState(false);
     const [theatreOpen, setTheatreOpen] = useState(false);


  return (
    <>
    <header className="w-full border border-gray-400 fixed top-0 left-0 z-50 bg-white">
  
      <nav className="w-full  bg-white px-6 md:px-16 py-4 flex items-center justify-between">
 
        <div className="flex items-center gap-2">
          <img src="/booking.webp" className="w-32" alt="logo" />
        </div>

        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <NavLink className="cursor-pointer" to="/">Home</NavLink>

          <NavLink
            className="cursor-pointer"
            onMouseMove={() => setMovie(true)}
          >
            Movies
          </NavLink>

          <NavLink
  className="cursor-pointer"
  onMouseEnter={() => setTheatreOpen(true)}>Theatres</NavLink>

          <NavLink className="cursor-pointer">Orders</NavLink>
        </ul>

        <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-full gap-2"onClick={() => setSearchOpen(true)}>
          <input
            type="text"
            placeholder="Search for movies, cinemas..."
            className="bg-transparent outline-none text-sm"
          />
        </div>

        <div className="ml-4 cursor-pointer"  onClick={() => setOpen(true)}>
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
            👤
          </div>
        </div>
      </nav>
      </header>
    

    
      <Moviesmodel show={movie} onClose={() => setMovie(false)} />
        <Theatres show={theatreOpen} onClose={()=> setTheatreOpen(false)}/>
        <Profilemodal show={open} onClose={() => setOpen(false)} />
         <Searchmodal show={searchOpen} onClose={() => setSearchOpen(false)} />

    </>
  );
}
