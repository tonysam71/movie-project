import { Phone, HelpCircle } from "lucide-react";

export default function Footer() {
  return (
    <div className="bg-gray-100 py-8 md:py-12 px-4 sm:px-6 md:px-20">
      
      {/* MAIN WRAPPER */}
      <div
        className="flex flex-col lg:flex-row
                   items-center lg:items-center
                   justify-between
                   gap-8 lg:gap-6"
      >
        {/* DOWNLOAD APP SECTION */}
        <div
          className="flex flex-col sm:flex-row
                     items-center gap-4 sm:gap-6
                     text-center sm:text-left"
        >
          <h2 className="text-lg md:text-xl font-semibold">
            Download App
          </h2>

          <div className="flex gap-4">
            <img
              src="/a3a9f391d5bc48d312bdbfd556710281.png"
              alt="Google Play"
              className="w-32 sm:w-36 cursor-pointer"
            />
            <img
              src="/ccb54c528f9bcf326ca48ea29bd6d890.png"
              alt="App Store"
              className="w-28 sm:w-32 cursor-pointer"
            />
          </div>
        </div>

        {/* CUSTOMER CARE + FAQ */}
        <div className="flex gap-6 sm:gap-10">
          
          {/* CUSTOMER CARE */}
          <div className="flex flex-col items-center cursor-pointer">
            <div
              className="w-12 h-12 sm:w-14 sm:h-14
                         bg-white rounded-full shadow
                         flex items-center justify-center"
            >
              <Phone size={22} />
            </div>
            <p className="text-xs sm:text-sm mt-2">
              Customer Care
            </p>
          </div>

          {/* FAQ */}
          <div className="flex flex-col items-center cursor-pointer">
            <div
              className="w-12 h-12 sm:w-14 sm:h-14
                         bg-white rounded-full shadow
                         flex items-center justify-center"
            >
              <HelpCircle size={22} />
            </div>
            <p className="text-xs sm:text-sm mt-2">
              FAQ
            </p>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <hr className="mt-8 md:mt-10 border-gray-300" />
    </div>
  );
}
