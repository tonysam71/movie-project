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

import Dashboard from "./admin/Dashboard"
import Dash from "./admin/Dash";
import AddMovie from "./admin/AddMovie";
import AddTheatres from "./admin/AddTheatres";
import AllTheatres from "./admin/AllTheatres";
import AllMovies from "./admin/AllMovies";
import CreateShow from "./admin/CreateShow";
import ProtectedRoute from "./admin/ProtectedRoute";
import AdminAuth from "./admin/AdminAuth";







function App() {
  let location = useLocation();
  return (
  <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/movie/:slug" element={<MovieDetails />} />
        <Route path="/theatre/:id" element={<TheatreDetail />} />
        <Route path="/movies/list/:type/:value" element={<Moviecard />}/>

        {/* dashboard routes */}
        <Route path="/loginadmin" element={<AdminAuth />} />
                <Route path='/dashboard' element={<ProtectedRoute > <Dashboard /></ProtectedRoute>}>
                  <Route index element={<Dash />}></Route>
                  <Route path='addmovie' element={<AddMovie />}></Route>
                  <Route path='addtheatre' element={<AddTheatres />}></Route>
                  <Route path='alltheatres' element={<AllTheatres />}></Route>
                  <Route path='allmovies' element={<AllMovies />}></Route>
                  <Route path='createshow' element={<CreateShow />}></Route>
                </Route>
      </Routes>

      
   {!location.pathname.includes("orders") &&
 !location.pathname.includes("dashboard") && <Footer />}

    </>
  );
}

export default App;
