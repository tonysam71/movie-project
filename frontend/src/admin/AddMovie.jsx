import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";


export default function CreateMovie() {
  const [form, setForm] = useState({
    name: "",
    releaseDate: "",
    duration: "",
    category: "now",
    isReleased: false,
    description: "",
  });

  const [genre, setGenre] = useState([""]);
  const [language, setLanguage] = useState([""]);
  const [castNames, setCastNames] = useState([""]);
  const [poster, setPoster] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleArrayChange = (index, value, state, setState) => {
    const updated = [...state];
    updated[index] = value;
    setState(updated);
  };

  const addMore = (setState) => setState((p) => [...p, ""]);
  const remove = (index, state, setState) =>
    setState(state.filter((_, i) => i !== index) || [""]);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">
          🎬 Create Movie
        </h1>

        <form className="space-y-8">
          {/* BASIC INFO */}
          <Section title="Basic Information">
            <Grid>
              <Input
                placeholder="Movie Name"
                name="name"
                onChange={handleChange}
              />
              <Input
                type="date"
                name="releaseDate"
                onChange={handleChange}
              />
              <Input
                placeholder="Duration (2h 30m)"
                name="duration"
                onChange={handleChange}
              />
              <Select
                name="category"
                onChange={handleChange}
                options={[
                  { label: "Now Showing", value: "now" },
                  { label: "Upcoming", value: "upcoming" },
                ]}
              />
            </Grid>

            <label className="flex items-center gap-3 mt-4 text-sm text-slate-600">
              <input
                type="checkbox"
                name="isReleased"
                onChange={handleChange}
                className="accent-black"
              />
              Movie Released
            </label>
          </Section>

          {/* GENRE */}
          <Section title="Genre">
            <DynamicField
              title="Genre"
              data={genre}
              setData={setGenre}
              onChange={handleArrayChange}
              addMore={addMore}
              remove={remove}
            />
          </Section>

          {/* LANGUAGE */}
          <Section title="Language">
            <DynamicField
              title="Language"
              data={language}
              setData={setLanguage}
              onChange={handleArrayChange}
              addMore={addMore}
              remove={remove}
            />
          </Section>

          {/* CAST */}
          <Section title="Cast Names">
            <DynamicField
              title="Cast"
              data={castNames}
              setData={setCastNames}
              onChange={handleArrayChange}
              addMore={addMore}
              remove={remove}
            />
          </Section>

          {/* DESCRIPTION */}
          <Section title="Description">
            <textarea
              name="description"
              rows={4}
              placeholder="Movie story, plot, highlights..."
              className="input resize-none"
              onChange={handleChange}
            />
          </Section>

          {/* POSTER */}
          <Section title="Poster Upload">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPoster(e.target.files[0])}
              className="block w-full text-sm file:bg-black file:text-white file:px-4 file:py-2 file:rounded-lg file:border-0 cursor-pointer"
            />
          </Section>

          <div className="pt-6 border-t">
            <button className="bg-black hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-semibold transition">
              Create Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ================= UI Components ================= */

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-700 mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Grid({ children }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">{children}</div>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className="input focus:ring-2 focus:ring-black"
    />
  );
}

function Select({ options, ...props }) {
  return (
    <select
      {...props}
      className="input focus:ring-2 focus:ring-black"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

/* ================= Dynamic Field ================= */

function DynamicField({
  data,
  setData,
  onChange,
  addMore,
  remove,
}) {
  return (
    <div className="space-y-3">
      {data.map((item, idx) => (
        <div key={idx} className="flex gap-3">
          <input
            className="input flex-1"
            value={item}
            placeholder="Type here..."
            onChange={(e) =>
              onChange(idx, e.target.value, data, setData)
            }
          />

          {data.length > 1 && (
            <button
              type="button"
              onClick={() => remove(idx, data, setData)}
              className="px-3 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
            >
              ✕
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => addMore(setData)}
        className="text-sm text-blue-600 hover:underline"
      >
        + Add more
      </button>
    </div>
  );
}
