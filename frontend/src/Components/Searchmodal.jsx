export default function SearchModal({ show, onClose }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition 
      ${show ? "visible bg-black/40 backdrop-blur-sm" : "invisible opacity-0"}`}
      onClick={onClose}
    >
      <div
        className={`bg-white w-[480px] md:w-[620px] rounded-3xl p-10 shadow-lg relative
        transition-transform duration-700 ease-in-out
        ${show ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
       

        <h2 className="text-2xl font-semibold text-center mb-4">
          Search Movies 
        </h2>

        <div className="border rounded-xl flex items-center gap-3 px-4 py-3 bg-gray-50">
          
          <input
            type="text"
            className="w-full bg-transparent outline-none"
            placeholder="Type movie or theatre..."
          />
        </div>

        
      </div>
    </div>
  );
}
