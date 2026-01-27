const express = require("express");
const connectDB = require("./Configs/db");
const path = require("path");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 4000;

connectDB();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

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

const frontendPath = path.join(__dirname, "../frontend/dist");

app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
