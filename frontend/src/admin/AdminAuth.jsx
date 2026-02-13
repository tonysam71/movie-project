import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminAuth() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === "register") {
        const res = await axios.post(
          "/api/admin/register",
          { name, email, password }
        );
        alert(res.data.message);
        setMode("login");
      } else {
        const res = await axios.post(
          "/api/admin/login",
          { email, password }
        );

        localStorage.setItem("token", res.data.token);

        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded"
      >
        <h2 className="text-xl mb-4">
          {mode === "login" ? "Login" : "Register"}
        </h2>

        {mode === "register" && (
          <input
            className="border p-2 mb-2 w-full"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          className="border p-2 mb-2 w-full"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 mb-2 w-full"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-500 text-white p-2 w-full">
          {mode === "login" ? "Login" : "Register"}
        </button>

        <p
          className="mt-2 text-blue-500 cursor-pointer"
          onClick={() =>
            setMode(mode === "login" ? "register" : "login")
          }
        >
          Switch to {mode === "login" ? "Register" : "Login"}
        </p>
      </form>
    </div>
  );
}
