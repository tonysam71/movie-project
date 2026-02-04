import React, { useEffect } from "react";
import {  Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import MovieDetails from "./Components/MovieDetails";
import Footer from "./Components/Footer";
import TheatreDetail from "./Components/TheatreDetail";
import "./App.css";
import Orders from "./Components/Orders";
import Moviecard from "./Components/Moviecard";

function App() {
  let location = useLocation();
  return (
  <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/movie/:name" element={<MovieDetails />} />
        <Route path="/theatre/:id" element={<TheatreDetail />} />
        <Route path="/movies/list/:type/:value" element={<Moviecard />}/>
      </Routes>

      
   {!location.pathname.includes("orders") && <Footer />}
    </>
  );
}

export default App;
