require("dotenv").config();
const express = require("express");
const connectDB = require("./Configs/db");
const path = require("path");
const cors = require("cors");

const app = express();

// CORS for frontend
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "Uploads")));

// Routes
const movieUserRoute = require("./Routes/movieuserRoute");
const movieRoute = require("./Routes/MovieRoute");
const theatreRoute = require("./Routes/TheatreRoute");

app.use("/api/user", movieUserRoute);
app.use("/api/movie", movieRoute);
app.use("/api/theatre", theatreRoute);

// Connect to MongoDB
connectDB();

// Root route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
