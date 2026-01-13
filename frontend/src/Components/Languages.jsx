import React, { useRef } from "react";


const languages = [
  "Hindi Movies",
  "English Movies",
  "Telugu Movies",
  "Tamil Movies",
  "Kannada Movies",
  "Bengali Movies",
  "Bhojpuri Movies",
  "Malayalam Movies",
  "Odia Movies",
  "Marathi Movies",
  "Punjabi Movies",
];

const genres = [
  "Comedy Movies",
  "Action Movies",
  "Drama Movies",
  "Romance Movies",
  "Horror Movies",
  "Thriller Movies",
  "Crime Movies",
  "Mystery Movies",
  "Biography Movies",
  "Adventure Movies",
];

export default function CategoriesSection() {

  const langRef = useRef(null);
  const genreRef = useRef(null);

 
  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="px-6 md:px-16 py-10 space-y-10">

     
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Explore Latest Movies in Indore by Language
        </h2>

        <div className="relative">

        
          <div
            ref={langRef}
            className="flex items-center gap-3 overflow-x-auto scrollbar-hide py-2 pr-14"
          >
            {languages.map((lang, i) => (
              <button
                key={i}
                className="whitespace-nowrap px-4 py-1.5 text-sm border rounded-full text-gray-700 hover:bg-gray-100 transition"
              >
                {lang}
              </button>
            ))}
          </div>

         
         
        </div>
      </div>

    
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Explore Latest Movies in Indore by Genre
        </h2>

        <div className="relative">

         
          <div
            ref={genreRef}
            className="flex items-center gap-3 overflow-x-auto scrollbar-hide py-2 pr-14"
          >
            {genres.map((g, i) => (
              <button
                key={i}
                className="whitespace-nowrap px-4 py-1.5 text-sm border rounded-full text-gray-700 hover:bg-gray-100 transition"
              >
                {g}
              </button>
            ))}
          </div>

          
          
        </div>
      </div>

    </div>
  );
}
