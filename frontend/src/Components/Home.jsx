import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Moviesection from '../Components/Moviesection'
import Languages from "./Languages";
import Filterbar from "./Filterbar";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

export default function Home() {
  const [movies, setMovies] = useState([]);
   const [filter, setFilter] = useState({
    language: "",
    genre: "",
  });

  const getdata = async () => {
    try {
      const res = await fetch("/api/movie/getmovies?category=now");
      const data = await res.json();

      if (data.success) {
        setMovies(Array.isArray(data.data) ? data.data : []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      {/* HERO SLIDER */}
      <div className="w-full mt-[60px] md:mt-[79px] py-8 md:py-12 px-4 sm:px-6 md:px-16">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={movies.length > 1}
          className="max-w-7xl mx-auto"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie._id}>
              <Link to={"movie/" + movie.name}>
                <div className="relative min-h-[420px] sm:min-h-[450px] md:min-h-[500px] rounded-2xl overflow-hidden">
                  
                  {/* BLUR BACKGROUND */}
                  <div
                    className="absolute inset-0 bg-cover bg-center blur-xl scale-110"
                    style={{
                      backgroundImage: `url(${movie.poster?.url})`,
                    }}
                  ></div>

                  {/* DARK OVERLAY */}
                  <div className="absolute inset-0 bg-black/60"></div>

                  {/* CONTENT */}
                  <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center px-5 sm:px-8 md:px-10 py-8 md:py-10">
                    
                    {/* TEXT */}
                    <div className="text-center md:text-left">
                      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                        {movie.name}
                      </h1>

                      <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6">
                        {movie.genre} | {movie.lang}
                      </p>

                      <button className="bg-white text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base md:text-lg font-semibold hover:bg-gray-200">
                        Book now
                      </button>
                    </div>

                    {/* POSTER */}
                    <div className="flex justify-center md:justify-end">
                      <img
                        src={movie.poster?.url}
                        alt="poster"
                        className="w-52 sm:w-64 md:w-80
                                   h-[300px] sm:h-[360px] md:h-[420px]
                                   object-cover rounded-2xl shadow-xl"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      
       {/* ONE FILTER BAR */}
      <Filterbar filter={filter} setFilter={setFilter} />

   
      
        <Moviesection
        filter={filter}
        section="now"
        title="Now Showing in Indore"
      />

      <Moviesection
        filter={filter}
        section="upcoming"
        title="Upcoming Movies"
      />
      
      <Languages />
    </>
  );
}
