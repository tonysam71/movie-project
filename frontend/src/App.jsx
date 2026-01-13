import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import MovieDetails from './Components/MovieDetails'
import Footer from './Components/Footer'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:name" element={<MovieDetails />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
} 

export default App
