import { NextFunction, Request, RequestHandler, Response } from "express";
import * as moviesDAL from "../DAL/moviesWS";
import * as memberDAL from "../DAL/membersWS";
import * as subscriptionsDAL from "../DAL/subscriptionsWS";
import {
  MovieObject,
  SubscriptionObject,
} from "../interfaces/subscriptionsTypes";

/* Helper Functions */
//gets movie (without subscriptions) and all subscriptions, returns movie with subscriptions
const getSubscriptionsForMovie = (
  movie: MovieObject,
  allSubscriptions: SubscriptionObject[]
): MovieObject => {
  let movieSubscriptions: SubscriptionObject[] = [];
  allSubscriptions.forEach((subscription) => {
    subscription.movies?.forEach((subMovie) => {
      if (subMovie.movieId._id === movie._id) {
        movieSubscriptions.push({ ...subscription, movies: [subMovie] });
      }
    });
  });
  return { ...movie, subscriptions: movieSubscriptions };
};

/* CRUD - Create, Read, Update, Delete Operations */

const getAllMovies: RequestHandler = async (req, res, next) => {
  try {
    let allMovies = await moviesDAL.getMovies();
    let allSubscriptions = await subscriptionsDAL.getAllSubscriptions();

    //for each movie, match the subscriptions

    allMovies = allMovies.map((movie) => {
      return getSubscriptionsForMovie(movie, allSubscriptions);
    });

    res.render("movies/all-movies", {
      pageTitle: "All Movies",
      movies: allMovies,
      path: "/movies",
      editing: false,
    });
  } catch (err: any) {
    let error = new Error(err);
    next(error);
  }
};

const getMovieById: RequestHandler = async (req, res, next) => {
  try {
    let movieId = req.params.movieId;
    let movie = await moviesDAL.getMovieById(movieId);

    let allSubscriptions = await subscriptionsDAL.getAllSubscriptions();
    movie = getSubscriptionsForMovie(movie, allSubscriptions);

    res.render("movies/all-movies", {
      pageTitle: "All Movies",
      movies: [movie],
      path: "/movies",
      editing: false,
    });
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
    } as MovieObject;
    await moviesDAL.addMovie(insertedMovie);
    res.redirect("/movies");
  } catch (err: any) {
    let error = new Error(err);
    next(error);
  }
};

const updateMovie: RequestHandler = async (req, res, next) => {
  try {
    let movieId = req.params.movieId;
    let movie = req.body;
    console.log(movie);
    console.log(movieId);
    let updatedMovie = await moviesDAL.updateMovie(movieId, movie);
    res.status(201).json(updatedMovie);
  } catch (err: any) {
    let error = new Error(err);
    next(error);
  }
};

const deleteMovie: RequestHandler = async (req, res, next) => {
  try {
    let movieId = req.params.movieId;
    await moviesDAL.deleteMovie(movieId);
    res.redirect(200, "/movies");
  } catch (err: any) {
    let error = new Error(err);
    next(error);
  }
};

/* Navigation */

//Add Movie Page
const getAddMoviePage: RequestHandler = (req, res, next) => {
  res.render("movies/add-movie", {
    pageTitle: "Add Movie",
    movie: {},
    path: "/movies/add-movie",
    editing: false,
  });
};

//Edit Movie Page

const getEditMoviePage: RequestHandler = async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    const movie = await moviesDAL.getMovieById(movieId);
    const movieGenres = movie.genres.join(", ");
    const moviePremiered = movie.premiered
      ? movie.premiered.toISOString().split("T")[0]
      : "";

    res.render("movies/add-movie", {
      pageTitle: `Edit ${movie.name}`,
      movie: { ...movie, genres: movieGenres, premiered: moviePremiered },
      path: "/movies/edit-movie",
      editing: true,
    });
  } catch (err: any) {
    let error = new Error(err);
    next(error);
  }
};

export {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
  getAddMoviePage,
  getEditMoviePage,
};
