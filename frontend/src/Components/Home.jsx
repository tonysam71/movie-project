import react, { useEffect, useState,  } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Now from './Now'
import Languages from './Languages'
import Upcoming from "./Upcoming";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";



export default function Home() {
   const [movies, setMovies] = useState([]);
  
    const getdata = async () => {
      try {
        const res = await fetch("/api/movie/getmovies?category=now");
        const data = await res.json();
        console.log(data.data)
  
        if (data.success) {
          setMovies(Array.isArray(data.data)?data.data:[]);
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
      <div className="w-full mt-[3%] py-12 px-6 md:px-16">

        <Swiper
  modules={[Navigation, Pagination, Autoplay]}
  navigation
  pagination={{ clickable: true }}
  autoplay={{ delay: 5000 }}
  loop={movies.length > 1}
  className="max-w-7xl mx-auto"
>

          {movies.map((movie)=>(
            <SwiperSlide key={movie._id}>

              <Link to={"movie/" + movie.name}>
              <div
                className="relative min-h-[500px] rounded-2xl overflow-hidden "
              >


                <div
                  className="absolute inset-0 bg-cover bg-center blur-xl scale-110"
                  style={{
                    backgroundImage: `url(${movie.poster?.url})`,
                  }}
                ></div>

               
                <div className="absolute inset-0 bg-black/60 w-full"></div>
                
                <div className="relative grid md:grid-cols-2 gap-10 items-center px-10 py-10">

                  
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-3">
                      {movie.name}
                    </h1>

                    <p className="text-gray-300 text-lg mb-6">
                      {movie.genre} | {movie.lang}
                    </p>

                    <button className="bg-white text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200">
                      Book now
                    </button>
                  </div>

                
                 
                  <div className="flex justify-center">
                    <img
                      src={movie.poster?.url}
                      alt="poster"
                      className="w-80 h-[420px] object-cover rounded-2xl shadow-xl"
                    />
                  </div>
                 

                </div>
              </div>
               </Link>

            </SwiperSlide>
            ))}

        </Swiper>

      </div>
       <Now />
      <Upcoming />
      <Languages />
    </>
  );
}
