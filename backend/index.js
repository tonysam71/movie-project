require("dotenv").config();
const express = require("express");
const connectDB = require("./Configs/db");
const path = require("path");
const cors = require("cors");

const app = express();


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/uploads", express.static(path.join(__dirname, "Uploads")));

const movieUserRoute = require("./Routes/movieuserRoute");
const movieRoute = require("./Routes/MovieRoute");
const theatreRoute = require("./Routes/TheatreRoute");

app.use("/api/user", movieUserRoute);
app.use("/api/movie", movieRoute); 
app.use("/api/theatre", theatreRoute);


connectDB();


app.get("/", (req, res) => {
  res.send("Server is running");
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
