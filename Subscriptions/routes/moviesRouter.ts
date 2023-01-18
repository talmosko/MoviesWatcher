import { Router } from "express";
import * as moviesBLL from "../BLL/moviesBLL";
import { MovieObject } from "../interfaces/mongoose.gen";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    let movies = await moviesBLL.getAllMovies();
    res.json(movies);
  } catch (err) {
    return next(err);
  }
});

router.get("/:movieId", async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    const movie = await moviesBLL.getMovieById(movieId);
    res.status(200).json(movie);
  } catch (err) {
    return next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const movie = req.body as MovieObject;
    await moviesBLL.addMovie(movie);
    res.status(201).json({ message: "Movie added" });
  } catch (err) {
    return next(err);
  }
});

router.put("/:movieId", async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    const movie = req.body as MovieObject;
    console.log(movie);
    console.log(movieId);
    await moviesBLL.updateMovie(movieId, movie);
    res.status(201).json({ message: "Movie Updated" });
  } catch (err) {
    return next(err);
  }
});

router.delete("/:movieId", async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    await moviesBLL.deleteMovie(movieId);
    res.status(200).json({ message: "Movie deleted" });
  } catch (err) {
    return next(err);
  }
});

export default router;
