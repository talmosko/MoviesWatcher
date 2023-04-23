import { RequestHandler } from "express";
import * as moviesDAL from "../DAL/moviesWS";
import { MovieObject, SubscriptionObject } from "../types/objectTypes";

/* CRUD - Create, Read, Update, Delete Operations */

const getAllMovies: RequestHandler = async (req, res, next) => {
  try {
    const allMovies = await moviesDAL.getMovies();

    res.json({
      movies: allMovies,
    });
  } catch (err: any) {
    console.log(err);
    const error = new Error(err);
    return next(error);
  }
};

const getMovieById: RequestHandler = async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    const movie = await moviesDAL.getMovieById(movieId);

    res.json({
      movie,
    });
  } catch (err: any) {
    const error = new Error(err);
    next(error);
  }
};

const addMovie: RequestHandler = async (req, res, next) => {
  try {
    const movie = req.body;
    const insertedMovie = {
      ...movie,
    } as MovieObject;
    await moviesDAL.addMovie(insertedMovie);
    res.redirect("/movies");
  } catch (err: any) {
    const error = new Error(err);
    next(error);
  }
};

const updateMovie: RequestHandler = async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    const movie = req.body;
    console.log(movie);
    console.log(movieId);
    const updatedMovie = await moviesDAL.updateMovie(movieId, movie);
    res.status(201).json({ message: "Movie Updated", movie: updatedMovie });
  } catch (err: any) {
    const error = new Error(err);
    next(error);
  }
};

const deleteMovie: RequestHandler = async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    const deleteRes: {
      movieId: MovieObject["_id"];
      subscriptions: SubscriptionObject[];
    } = await moviesDAL.deleteMovie(movieId);
    res.status(200).json(deleteRes);
  } catch (err: any) {
    const error = new Error(err);
    next(error);
  }
};

export { getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie };
