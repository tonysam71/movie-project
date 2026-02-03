
export default function FilterBar({ filter, setFilter }) {
  return (
    <div className="flex flex-wrap gap-3 max-w-7xl mx-auto px-4 ">
      <button
        onClick={() => setFilter({})}
        className="px-4 py-2 border rounded-xl hover:bg-black hover:text-white"
      >
        All
      </button>

      <button
        onClick={() => setFilter({ ...filter, language: "English" })}
        className="px-4 py-2 border rounded-xl hover:bg-black hover:text-white"
      >
        English
      </button>

      <button
        onClick={() => setFilter({ ...filter, language: "Hindi" })}
        className="px-4 py-2 border rounded-xl hover:bg-black hover:text-white"
      >
        Hindi
      </button>

      <button
        onClick={() => setFilter({ ...filter, genre: "action" })}
        className="px-4 py-2 border rounded-xl hover:bg-black hover:text-white"
      >
        Action
      </button>

      <button
        onClick={() => setFilter({ ...filter, genre: "biography" })}
        className="px-4 py-2 border rounded-xl hover:bg-black hover:text-white"
      >
        Biography
      </button>
    </div>
  );
}
