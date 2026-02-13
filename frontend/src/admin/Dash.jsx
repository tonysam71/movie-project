export default function Dash() {
  return (
    <div className="grid grid-cols-3 mt-16 gap-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold">Total Movies</h3>
        <p className="text-3xl mt-2 font-bold text-blue-600">24</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold">Total Theatres</h3>
        <p className="text-3xl mt-2 font-bold text-green-600">12</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold">Total Shows</h3>
        <p className="text-3xl mt-2 font-bold text-purple-600">86</p>
      </div>
    </div>
  );
}
