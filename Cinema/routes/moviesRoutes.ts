import { Router } from "express";
import * as moviesBLL from "../BLL/moviesBLL";

const router = Router();

// Navigation

router.get("/add-movie", moviesBLL.getAddMovie);
router.get("/edit-movie/:movieId", moviesBLL.getEditMovie);

// CRUD - Create, Read, Update, Delete

router.get("/", moviesBLL.getAllMovies);

router.get("/:movieId", moviesBLL.getMovieById);

router.post("/", moviesBLL.addMovie);

router.put("/:movieId", moviesBLL.updateMovie);

router.delete("/:movieId", moviesBLL.deleteMovie);

export default router;
