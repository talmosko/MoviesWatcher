"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEditMoviePage = exports.getAddMoviePage = exports.deleteMovie = exports.updateMovie = exports.addMovie = exports.getMovieById = exports.getAllMovies = void 0;
const moviesDAL = __importStar(require("../DAL/moviesWS"));
/* CRUD - Create, Read, Update, Delete Operations */
const getAllMovies = async (req, res, next) => {
    try {
        let allMovies = await moviesDAL.getMovies();
        res.render("movies/all-movies", {
            pageTitle: "All Movies",
            movies: allMovies,
            path: "/movies",
            editing: false,
        });
    }
    catch (err) {
        let error = new Error(err);
        next(error);
    }
};
exports.getAllMovies = getAllMovies;
const getMovieById = async (req, res, next) => {
    try {
        let movieId = req.params.movieId;
        let movie = await moviesDAL.getMovieById(movieId);
        res.json(movie);
    }
    catch (err) {
        let error = new Error(err);
        next(error);
    }
};
exports.getMovieById = getMovieById;
const addMovie = async (req, res, next) => {
    try {
        let movie = req.body;
        let insertedMovie = Object.assign(Object.assign({}, movie), { genres: movie.genres.split(",") });
        await moviesDAL.addMovie(insertedMovie);
        res.redirect("/movies");
    }
    catch (err) {
        let error = new Error(err);
        next(error);
    }
};
exports.addMovie = addMovie;
const updateMovie = async (req, res, next) => {
    try {
        let movieId = req.params.movieId;
        let movie = req.body;
        console.log(movie);
        console.log(movieId);
        let updatedMovie = await moviesDAL.updateMovie(movieId, movie);
        res.status(201).json(updatedMovie);
    }
    catch (err) {
        let error = new Error(err);
        next(error);
    }
};
exports.updateMovie = updateMovie;
const deleteMovie = async (req, res, next) => {
    try {
        let movieId = req.params.movieId;
        await moviesDAL.deleteMovie(movieId);
        res.redirect(200, "/movies");
    }
    catch (err) {
        let error = new Error(err);
        next(error);
    }
};
exports.deleteMovie = deleteMovie;
/* Navigation */
//Add Movie Page
const getAddMoviePage = (req, res, next) => {
    res.render("movies/add-movie", {
        pageTitle: "Add Movie",
        movie: {},
        path: "/movies/add-movie",
        editing: false,
    });
};
exports.getAddMoviePage = getAddMoviePage;
//Edit Movie Page
const getEditMoviePage = async (req, res, next) => {
    try {
        const movieId = req.params.movieId;
        const movie = await moviesDAL.getMovieById(movieId);
        const movieGenres = movie.genres.join(", ");
        const moviePremiered = movie.premiered
            ? movie.premiered.toISOString().split("T")[0]
            : "";
        res.render("movies/add-movie", {
            pageTitle: `Edit ${movie.name}`,
            movie: Object.assign(Object.assign({}, movie), { genres: movieGenres, premiered: moviePremiered }),
            path: "/movies/edit-movie",
            editing: true,
        });
    }
    catch (err) {
        let error = new Error(err);
        next(error);
    }
};
exports.getEditMoviePage = getEditMoviePage;
