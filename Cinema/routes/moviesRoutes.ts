import { Router } from "express";
import * as moviesBLL from "../BLL/moviesBLL";

const router = Router();

// Navigation

router.get("/add-movie", moviesBLL.getAddMovie);

// CRUD - Create, Read, Update, Delete

router.get("/", moviesBLL.getAllMovies);

router.get("/:id", moviesBLL.getMovieById);

router.post("/", moviesBLL.addMovie);

router.put("/:id", moviesBLL.updateMovie);

router.delete("/:id", moviesBLL.deleteMovie);

export default router;
