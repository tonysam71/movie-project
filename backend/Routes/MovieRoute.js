const router = require("express").Router();
const {
  createMovie,
  getMovies,
  getMovie,
  updateMovie,
  deleteMovie,
  FilterMovie,
  filterMovieQuery,
} = require("../Controllers/MovieController");
const upload = require("../Middleware/Upload");

router.post("/createmovie", upload.single("poster"), createMovie);


router.get("/getmovies", getMovies);
router.get("/getmovie/:name", getMovie);


router.put("/updatemovie/:id", upload.single("poster"), updateMovie);

router.delete("/deletemovie/:id", deleteMovie);
router.get("/filtermovie/:key/:value", FilterMovie)
router.get("/filtermovie-query", filterMovieQuery)

module.exports = router;
