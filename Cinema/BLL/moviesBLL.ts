import { NextFunction, Request, RequestHandler, Response } from "express";
import * as moviesDAL from "../DAL/moviesWS";
import { movieObject } from "../interfaces/subscriptionsTypes";

/* CRUD - Create, Read, Update, Delete Operations */
const getAllMovies: RequestHandler = async (req, res, next) => {
  try {
    let allMovies = await moviesDAL.getMovies();
    res.render("movies/all-movies", {
      pageTitle: "All Movies",
      movies: allMovies,
    });
  } catch (err: any) {
    let error = new Error(err);
    next(error);
  }
};

const getMovieById: RequestHandler = async (req, res, next) => {
  try {
    let id = req.params.id;
    let movie = await moviesDAL.getMovieById(id);
    res.json(movie);
  } catch (err: any) {
    let error = new Error(err);
    next(error);
  }
};

const addMovie: RequestHandler = async (req, res, next) => {
  try {
    let movie = req.body;
    let insertedMovie = {
      ...movie,
      genres: movie.genres.split(","),
    } as movieObject;
    await moviesDAL.addMovie(insertedMovie);
    res.redirect("/movies");
  } catch (err: any) {
    let error = new Error(err);
    next(error);
  }
};

const updateMovie: RequestHandler = async (req, res, next) => {
  try {
    let id = req.params.id;
    let movie = req.body;
    let updatedMovie = await moviesDAL.updateMovie(id, movie);
    res.json(updatedMovie);
  } catch (err: any) {
    let error = new Error(err);
    next(error);
  }
};

const deleteMovie: RequestHandler = async (req, res, next) => {
  try {
    let id = req.params.id;
    await moviesDAL.deleteMovie(id);
    res.redirect(200, "/movies");
  } catch (err: any) {
    let error = new Error(err);
    next(error);
  }
};

/* Navigation */

//Add Movie Page
const getAddMovie: RequestHandler = (req, res, next) => {
  res.render("movies/add-movie", { pageTitle: "Add Movie" });
};

export {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
  getAddMovie,
};
