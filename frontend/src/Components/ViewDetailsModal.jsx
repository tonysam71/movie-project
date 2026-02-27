// import { Bold } from "lucide-react";
// import { useEffect, useState } from "react";

// export default function ViewDetailsModal({ slug, onClose }) {
//   const [movie, setMovie] = useState(null);
//   const [activeTab, setActiveTab] = useState("Reviews");

//   useEffect(() => {
//   console.log("Slug received:", slug);

//   if (!slug) return;

//   fetch(`/api/movie/${slug}`)
//     .then((res) => {
//       console.log("Status:", res.status);
//       return res.json();
//     })
//     .then((data) => {
//       console.log("API Response:", data);

//       if (data.success) setMovie(data.data);
//       else setMovie(false);
//     })
//     .catch((err) => {
//       console.log("Fetch error:", err);
//       setMovie(false);
//     });
// }, [slug]);

//   return (
//     <div
//       className="fixed inset-0 bg-black/60 backdrop-blur-sm
//                  z-50 flex items-center justify-center"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white w-full max-w-[900px]
//                    rounded-xl p-6 relative"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           className="absolute top-4 right-4 text-xl"
//           onClick={onClose}
//         >
//           ✕
//         </button>

//         {/* LOADING */}
//         {movie === null && (
//           <p className="text-center py-10">Loading movie...</p>
//         )}

//         {/* ERROR */}
//         {movie === false && (
//           <p className="text-center py-10 text-red-500">
//             Movie not found
//           </p>
//         )}

//         {/* DATA */}
//         {movie && (
//           <>
//             <h2 className="text-xl font-bold mb-2">Movie details</h2>
//             <p className="text-gray-500 mb-4">{movie.name}</p>

//             <div className="flex gap-6 border-b mb-4">
//               {["Reviews", "Synopsis", "Cast","Posters"].map((tab) => (
//                 <span
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`cursor-pointer pb-2 ${
//                     activeTab === tab
//                       ? "border-b-2 border-blue-600 text-blue-600"
//                       : "text-gray-500"
//                   }`}
//                 >
//                   {tab}
//                 </span>
//               ))}
//             </div>

//             {activeTab === "Reviews" && (
//               <p>{movie.description}</p>
//             )}

//             {activeTab === "Synopsis" && (
//               <div>
//                 <p>{movie.description}</p>
//                 <br />
//                 <p>{movie.language}</p>
//                 <p>{movie.genre}</p>
//               </div>
//             )}
//             {activeTab === "Cast" && (
//               <p>{movie.castNames}</p>
//             )}
//             {activeTab === "Posters" && (
//              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                   <div className="h-[260px] bg-gray-100 rounded-lg
//                                   flex items-center justify-center text-gray-400">
//                    <img
//                     src={movie.poster?.url}
//                     alt={movie.name}
//                     className="w-full h-full object-cover"
//                   />
//                   </div>

//                 </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";

export default function ViewDetailsModal({ slug, onClose }) {
  const [movie, setMovie] = useState(null);
  const [activeTab, setActiveTab] = useState("Reviews");

  useEffect(() => {
    console.log("Slug received:", slug);
    if (!slug) return;

    setMovie(null); // reset on slug change

    fetch(`/api/movie/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMovie(data.data);
        else setMovie(false);
      })
      .catch(() => setMovie(false));
  }, [slug]);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-3 sm:px-6"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[900px] rounded-xl sm:rounded-2xl p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          className="absolute top-3 sm:top-4 right-3 sm:right-4 text-lg sm:text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        {/* LOADING */}
        {movie === null && (
          <p className="text-center py-10 text-gray-500">
            Loading movie...
          </p>
        )}

        {/* ERROR */}
        {movie === false && (
          <p className="text-center py-10 text-red-500">
            Movie not found
          </p>
        )}

        {/* DATA */}
        {movie && (
          <>
            {/* HEADER */}
            <h2 className="text-lg sm:text-xl font-bold mb-1">
              Movie details
            </h2>
            <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">
              {movie.name}
            </p>

            {/* TABS */}
            <div className="flex gap-4 sm:gap-6 border-b mb-4 sm:mb-3 overflow-x-auto">
              {["Reviews", "Synopsis", "Cast",  "Posters"].map((tab) => (
                <span
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`cursor-pointer pb-2 whitespace-nowrap transition ${
                    activeTab === tab
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </span>
              ))}
            </div>

            {/* TAB CONTENT */}
            <div className="relative overflow-hidden min-h-[120px] sm:min-h-[140px]">
              <div key={activeTab} className="animate-slideUp">
                {activeTab === "Reviews" && (
                  <p className="text-sm sm:text-base text-gray-700">
                    Reviews coming soon...
                  </p>
                )}

                {activeTab === "Synopsis" && (
                  <div>
                    <h1 className="p-1">Synopsis</h1>
                    <p className="text-sm p-1  sm:text-base text-gray-700 leading-relaxed">
                    {movie.description}
                  </p>
                  <p className="text-sm p-1 sm:text-base text-gray-700 leading-relaxed">
                     {(movie.genre).join(', ')}
                  </p>
                  </div>
                )}

                {activeTab === "Cast" && (
                 <div>
                   <h1 className="p-1">Cast</h1>
                  <p className="text-sm p-1 sm:text-base text-gray-700 leading-relaxed">
                     {movie.castNames}
                  </p>
                 </div>
                )}

            

                {activeTab === "Posters" && (
                 <div>
                  <h1>Poster</h1>
                  <img
                    src={movie.poster?.url}
                    alt={movie.name}
                    className="w-30 h-full "
                  />
                 </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
