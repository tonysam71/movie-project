if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const connectDB = require("./Configs/db"); 
const path = require("path");
const cors = require("cors");

const app = express();
connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use("/uploads", express.static(path.join(__dirname, "Uploads")));

const movieUserRoute = require("./Routes/movieuserRoute");
const movieRoute = require("./Routes/MovieRoute");
const theatreRoute = require("./Routes/TheatreRoute");
const showRoute = require("./Routes/showRoute");

app.use("/api/user", movieUserRoute);
app.use("/api/movie", movieRoute);
app.use("/api/theatre", theatreRoute);
app.use("/api/showmovie", showRoute);
 
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

