import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./Components/Home";
import Orders from "./Components/Orders";
import MovieDetails from "./Components/MovieDetails";
import TheatreDetail from "./Components/TheatreDetail";
import Moviecard from "./Components/Moviecard";

import AdminAuth from "./admin/AdminAuth";
import ProtectedRoute from "./admin/ProtectedRoute";
import Dashboard from "./admin/Dashboard";

import Dash from "./admin/Dash";
import AddMovie from "./admin/AddMovie";
import EditMovie from "./admin/Editmovie";
import AddTheatres from "./admin/AddTheatres";
import AllTheatres from "./admin/AllTheatres";
import AllMovies from "./admin/AllMovies";
import CreateShow from "./admin/CreateShow";

import './App.css'

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />

      <Routes>
        {/* public */}
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/movie/:slug" element={<MovieDetails />} />
        <Route path="/theatre/:id" element={<TheatreDetail />} />
        <Route path="/movies/list/:type/:value" element={<Moviecard />} />

        {/* admin auth */}
        <Route path="/loginadmin" element={<AdminAuth />} />

        {/* 🔐 protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Dash />} />
            <Route path="addmovie" element={<AddMovie />} />
            <Route path="editmovie/:id" element={<EditMovie />} />
            <Route path="addtheatre" element={<AddTheatres />} />
            <Route path="alltheatres" element={<AllTheatres />} />
            <Route path="allmovies" element={<AllMovies />} />
            <Route path="createshow" element={<CreateShow />} />
          </Route>
        </Route>
      </Routes>

      {!location.pathname.includes("dashboard") &&
        !location.pathname.includes("orders") && <Footer />}
    </>
  );
}

export default App;
