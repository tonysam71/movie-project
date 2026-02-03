const express = require("express");
const cors = require("cors");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const connectDB = require("./Configs/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "Uploads")));



app.use("/api/user", require("./Routes/movieuserRoute"));
app.use("/api/movie", require("./Routes/MovieRoute"));   
app.use("/api/theatre", require("./Routes/TheatreRoute"));
app.use("/api/showmovie", require("./Routes/showRoute"));

const frontendPath = path.join(__dirname, "../frontend/dist");
  
app.use(express.static(frontendPath));  

app.get("*", (req, res) => { 
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

app.use((err,req,res,next)=>{
  if(err){ 
    res.status(500).json({success:false,message:err.message})
  }
})

const PORT = process.env.PORT || 4000; 
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
