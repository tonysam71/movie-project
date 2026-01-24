import { Phone, HelpCircle } from "lucide-react";

export default function Footer() {
  return (
    <div className="bg-gray-100 py-12 px-6 md:px-20">

      <div className="flex items-center justify-between flex-wrap gap-6">

   
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-semibold">Download App</h2>

          <img
            src="/a3a9f391d5bc48d312bdbfd556710281.png"
            alt="Google Play"
            className="w-36 cursor-pointer"
          />
          {/* <img
            src="/ccb54c528f9bcf326ca48ea29bd6d890.png"
            alt="App Store"
            className="w-32 cursor-pointer"
          /> */}
        </div>

        <div className="flex items-center gap-10">

         
          <div className="flex flex-col items-center cursor-pointer">
            <div className="w-14 h-14 bg-white rounded-full shadow flex items-center justify-center">
              <Phone size={24} />
            </div>
            <p className="text-sm mt-2">Customer Care</p>
          </div>

          <div className="flex flex-col items-center cursor-pointer">
            <div className="w-14 h-14 bg-white rounded-full shadow flex items-center justify-center">
              <HelpCircle size={24} />
            </div>
            <p className="text-sm mt-2">FAQ</p>
          </div>

        </div>

      </div>

      <hr className="mt-10 border-gray-300" />
    </div>
  );
}
