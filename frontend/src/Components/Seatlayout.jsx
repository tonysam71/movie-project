import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SeatLayout = () => {
  const { showId, date, time } = useParams();
  

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const toggleSeat = (seat) => {
    if (seat.isBooked) return;

    if (selectedSeats.includes(seat.seatNumber)) {
      setSelectedSeats(
        selectedSeats.filter((s) => s !== seat.seatNumber)
      );
    } else {
      setSelectedSeats([...selectedSeats, seat.seatNumber]);
    }
  };

  useEffect(() => {
    if (showId && date && time) {
      fetchSeats();
    }
  }, [showId, date, time]);

  const fetchSeats = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/seats/getseats/${showId}/${date}/${time}`
      );

      setSeats(res.data.data.seats);
    } catch (err) {
      console.log("SEAT FETCH ERROR:", err);
    }
  };

 const bookSeats = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.openLoginModal();
    return;
  }

  try {
    await axios.post(
      "http://localhost:4000/api/seats/bookseats",
      {
        showId,
        date,
        time,
        seatNumbers: selectedSeats,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Seats Booked Successfully 🔥");
    setSelectedSeats([]);
    fetchSeats();
  } catch (error) {
    console.log(error);
  }
};
  // 🔥 Group seats by category
  const groupedSeats = seats.reduce((acc, seat) => {
    if (!acc[seat.category]) acc[seat.category] = [];
    acc[seat.category].push(seat);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md">

        {Object.entries(groupedSeats).map(([category, seatList]) => (
          <div key={category} className="mb-10">

            <h2 className="text-center text-lg font-semibold mb-4">
              {category}
            </h2>

            <div className="grid grid-cols-10 gap-3 justify-center">
              {seatList.map((seat) => (
                <div
                  key={seat.seatNumber}
                  onClick={() => toggleSeat(seat)}
                  className={`
                    w-9 h-9 flex items-center justify-center text-xs rounded-md cursor-pointer border
                    ${
                      seat.isBooked
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : selectedSeats.includes(seat.seatNumber)
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-white text-gray-800 border-gray-400 hover:bg-gray-200"
                    }
                  `}
                >
                  {seat.seatNumber.replace(/[A-Z]/g, "")}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* SCREEN */}
        <div className="flex justify-center mt-12">
          <div className="w-2/3 h-6 bg-purple-300 rounded-t-full shadow-inner"></div>
        </div>
        <p className="text-center text-xs mt-2 text-gray-500">
          SCREEN THIS WAY
        </p>

        {/* Book Button */}
        <div className="text-center mt-8">
          <button
            onClick={bookSeats}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
          >
            Book Selected Seats
          </button>
        </div>

      </div>
    </div>
  );
};

export default SeatLayout;