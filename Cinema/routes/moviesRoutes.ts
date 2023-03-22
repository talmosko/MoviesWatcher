import { Router } from "express";
import * as moviesBLL from "../BLL/moviesBLL";
import * as authMiddlewares from "../middlewares/authMiddlewares";
const router = Router();

//Endpoint localhost:3000/movies

// Navigation

router.get(
  "/add-movie",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth,
  moviesBLL.getAddMoviePage
);
router.get(
  "/edit-movie/:movieId",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth,
  moviesBLL.getEditMoviePage
);

// CRUD - Create, Read, Update, Delete

router.get(
  "/",
  // authMiddlewares.jwtMiddleware,
  // authMiddlewares.isAuth,
  moviesBLL.getAllMovies
);

router.get(
  "/:movieId",
  // authMiddlewares.jwtMiddleware,
  // authMiddlewares.isAuth,
  moviesBLL.getMovieById
);

router.post(
  "/",
  // authMiddlewares.jwtMiddleware,
  // authMiddlewares.isAuth,
  moviesBLL.addMovie
);

router.put(
  "/:movieId",
  // authMiddlewares.jwtMiddleware,
  // authMiddlewares.isAuth,
  moviesBLL.updateMovie
);

router.delete(
  "/:movieId",
  // authMiddlewares.jwtMiddleware,
  // authMiddlewares.isAuth,
  moviesBLL.deleteMovie
);

export default router;
