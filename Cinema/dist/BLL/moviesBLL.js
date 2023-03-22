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
const subscriptionsDAL = __importStar(require("../DAL/subscriptionsWS"));
const subscriptionsTypes_1 = require("../types/subscriptionsTypes");
/* Helper Functions */
//gets movie (without subscriptions) and all subscriptions, returns movie with subscriptions
const getSubscriptionsForMovie = (movie, allSubscriptions) => {
    let movieSubscriptions = [];
    allSubscriptions.forEach((subscription) => {
        var _a;
        (_a = subscription.movies) === null || _a === void 0 ? void 0 : _a.forEach((subMovie) => {
            if (subMovie.movieId._id === movie._id) {
                movieSubscriptions.push(Object.assign(Object.assign({}, subscription), { movies: [subMovie] }));
            }
        });
    });
    return Object.assign(Object.assign({}, movie), { subscriptions: movieSubscriptions });
};
/* CRUD - Create, Read, Update, Delete Operations */
const getAllMovies = async (req, res, next) => {
    try {
        //check 'View Movies' permission
        const userPermissions = req.userPermissions
            .permissions;
        if (!userPermissions.includes(subscriptionsTypes_1.UserPermissions.ViewMovies)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
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
    }
    catch (err) {
        console.log(err);
        let error = new Error(err);
        return next(error);
    }
};
exports.getAllMovies = getAllMovies;
const getMovieById = async (req, res, next) => {
    try {
        //check 'View Movies' permission
        const userPermissions = req.userPermissions
            .permissions;
        if (!userPermissions.includes(subscriptionsTypes_1.UserPermissions.ViewMovies)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
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
    }
    catch (err) {
        let error = new Error(err);
        next(error);
    }
};
exports.getMovieById = getMovieById;
const addMovie = async (req, res, next) => {
    try {
        //check 'Add Movies' permission
        const userPermissions = req.userPermissions
            .permissions;
        if (!userPermissions.includes(subscriptionsTypes_1.UserPermissions.CreateMovies)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
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
        //check 'Update Movies' permission
        const userPermissions = req.userPermissions
            .permissions;
        if (!userPermissions.includes(subscriptionsTypes_1.UserPermissions.UpdateMovies)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
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
        //check 'delete Movies' permission
        const userPermissions = req.userPermissions
            .permissions;
        if (!userPermissions.includes(subscriptionsTypes_1.UserPermissions.DeleteMovies)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
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
    //check 'Add Movies' permission
    const userPermissions = req.userPermissions
        .permissions;
    console.log(userPermissions);
    if (!userPermissions.includes(subscriptionsTypes_1.UserPermissions.CreateMovies)) {
        return res.status(401).json({ message: "Unauthorized" });
    }
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
        //check 'Update Movies' permission
        const userPermissions = req.userPermissions
            .permissions;
        if (!userPermissions.includes(subscriptionsTypes_1.UserPermissions.UpdateMovies)) {
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
