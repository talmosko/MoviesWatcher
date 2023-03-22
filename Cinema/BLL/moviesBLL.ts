import { RequestHandler } from "express";
import * as moviesDAL from "../DAL/moviesWS";
import * as subscriptionsDAL from "../DAL/subscriptionsWS";
import { hasPermission } from "../middlewares/authMiddlewares";
import {
  MovieObject,
  MovieSubscriptionObject,
  RequestWithUserPermissions,
  SubscriptionObject,
  UserPermissions,
} from "../types/subscriptionsTypes";

/* Helper Functions */
//gets movie (without subscriptions) and all subscriptions, returns movie with subscriptions
const getSubscriptionsForMovie = (
  movie: MovieObject,
  allSubscriptions: SubscriptionObject[]
): MovieObject => {
  let movieSubscriptions: MovieSubscriptionObject[] = [];
  allSubscriptions.forEach((subscription) => {
    subscription.movies?.forEach((subMovie) => {
      if (subMovie.movieId._id === movie._id) {
        movieSubscriptions.push({
          _id: subscription._id,
          memberId: subscription.memberId,
          date: subMovie.date,
        });
      }
    });
  });
  return { ...movie, subscriptions: movieSubscriptions };
};

/* CRUD - Create, Read, Update, Delete Operations */

const getAllMovies: RequestHandler = async (req, res, next) => {
  try {
    //check 'View Movies' permission
    // const hasViewMovies = hasPermission(req, UserPermissions.ViewMovies);
    // if (!hasViewMovies) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    let allMovies = await moviesDAL.getMovies();
    let allSubscriptions = await subscriptionsDAL.getAllSubscriptions();

    //for each movie, match the subscriptions

    allMovies = allMovies.map((movie) => {
      return getSubscriptionsForMovie(movie, allSubscriptions);
    });

    res.json({
      movies: allMovies,
    });
  } catch (err: any) {
    console.log(err);
    let error = new Error(err);
    return next(error);
  }
};

const getMovieById: RequestHandler = async (req, res, next) => {
  try {
    //check 'View Movies' permission
    // const hasViewMovies = hasPermission(req, UserPermissions.ViewMovies);
    // if (!hasViewMovies) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
    let movieId = req.params.movieId;
    let movie = await moviesDAL.getMovieById(movieId);

    let allSubscriptions = await subscriptionsDAL.getAllSubscriptions();
    movie = getSubscriptionsForMovie(movie, allSubscriptions);

    res.json({
      movie,
    });
  } catch (err: any) {
    let error = new Error(err);
    next(error);
  }
};

const addMovie: RequestHandler = async (req, res, next) => {
  try {
    //check 'View Movies' permission
    // const hasAddMovies = hasPermission(req, UserPermissions.CreateMovies);
    // if (!hasAddMovies) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
    let movie = req.body;
    let insertedMovie = {
      ...movie,
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
    //check 'Update Movies' permission
    // const hasUpdateMovies = hasPermission(req, UserPermissions.UpdateMovies);
    // if (!hasUpdateMovies) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
    let movieId = req.params.movieId;
    let movie = req.body;
    console.log(movie);
    console.log(movieId);
    let updatedMovie = await moviesDAL.updateMovie(movieId, movie);
    res.status(201).json({ message: "Movie Updated", movie: updatedMovie });
  } catch (err: any) {
    let error = new Error(err);
    next(error);
  }
};

const deleteMovie: RequestHandler = async (req, res, next) => {
  try {
    //check 'Delete Movies' permission
    // const hasDeleteMovies = hasPermission(req, UserPermissions.DeleteMovies);
    // if (!hasDeleteMovies) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
    let movieId = req.params.movieId;
    await moviesDAL.deleteMovie(movieId);
    res.status(200).json({ message: "Movie Deleted" });
  } catch (err: any) {
    let error = new Error(err);
    next(error);
  }
};

/* Navigation */

//Add Movie Page
const getAddMoviePage: RequestHandler = (req, res, next) => {
  //check 'Add Movies' permission
  const userPermissions = (req as RequestWithUserPermissions).userPermissions!
    .permissions;
  console.log(userPermissions);
  if (!userPermissions.includes(UserPermissions.CreateMovies)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
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
    //check 'Update Movies' permission
    const userPermissions = (req as RequestWithUserPermissions).userPermissions!
      .permissions;
    if (!userPermissions.includes(UserPermissions.UpdateMovies)) {
      return res.status(401).json({ message: "Unauthorized" });
    }
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
