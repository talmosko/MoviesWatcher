import { Router } from "express";
import * as moviesBLL from "../BLL/moviesBLL";
import * as authMiddlewares from "../middlewares/authMiddlewares";
import { UserPermissions } from "../types/objectTypes";
const router = Router();

//Endpoint localhost:3000/movies

router.get(
  "/",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth(UserPermissions.ViewMovies),
  moviesBLL.getAllMovies
);

router.get(
  "/:movieId",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth(UserPermissions.ViewMovies),
  moviesBLL.getMovieById
);

router.post(
  "/",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth(UserPermissions.CreateMovies),
  moviesBLL.addMovie
);

router.put(
  "/:movieId",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth(UserPermissions.UpdateMovies),
  moviesBLL.updateMovie
);

router.delete(
  "/:movieId",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth(UserPermissions.DeleteMovies),
  moviesBLL.deleteMovie
);

export default router;
