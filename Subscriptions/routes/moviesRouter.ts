import { Router } from "express";
import { nextTick } from "process";
import * as moviesBLL from "../BLL/moviesBLL";
import { moviesObject } from "../interfaces/mongoose.gen";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const movies = await moviesBLL.getAllMovies();
    res.json(movies);
  } catch (err) {
    return next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const movie = await moviesBLL.getMovieById(id);
    res.json(movie);
  } catch (err) {
    return next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const movie = req.body as moviesObject;
    await moviesBLL.addMovie(movie);
    res.status(201).json({ message: "Movie added" });
  } catch (err) {
    return next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const movie = req.body;
    await moviesBLL.updateMovie(id, movie);
    res.json(movie);
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await moviesBLL.deleteMovie(id);
    res.status(200).json({ message: "Movie deleted" });
  } catch (err) {
    return next(err);
  }
});

export default router;
