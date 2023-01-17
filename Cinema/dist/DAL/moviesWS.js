"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.addMovie = exports.getMovieById = exports.getMovies = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const address = (process.env.SUBSCRIPTIONS_API_URL || "http://localhost:8000/") + "movies";
const getMovies = async () => {
    try {
        const response = await axios_1.default.get(address);
        if (response.status !== 200) {
            throw new Error("Movies not found");
        }
        const movies = await response.data;
        //convert the premiered:string to date
        return movies.map((movie) => {
            return Object.assign(Object.assign({}, movie), { premiered: new Date(movie.premiered) });
        });
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.getMovies = getMovies;
const getMovieById = async (movieId) => {
    try {
        const response = await axios_1.default.get(address + "/" + movieId);
        if (response.status !== 200) {
            throw new Error("Movies not found");
        }
        const resData = (await response.data);
        //convert premiered to a date
        const premiered = resData.premiered
            ? new Date(resData.premiered)
            : undefined;
        return Object.assign(Object.assign({}, resData), { premiered: premiered });
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.getMovieById = getMovieById;
const addMovie = async (movie) => {
    try {
        const response = await axios_1.default.post(address, movie);
        if (response.status !== 201) {
            throw new Error("Movie not added");
        }
        const resData = await response.data;
        return resData;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.addMovie = addMovie;
const updateMovie = async (movieId, movie) => {
    try {
        const response = await axios_1.default.put(address + "/" + movieId, movie);
        console.log(response.status);
        if (response.status !== 201) {
            throw new Error("Movie not updated");
        }
        const resData = await response.data;
        return resData;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.updateMovie = updateMovie;
const deleteMovie = async (movieId) => {
    const response = await axios_1.default.delete(address + "/" + movieId);
    if (response.status !== 200) {
        throw new Error("Movie not deleted");
    }
    const resData = await response.data;
    return resData;
};
exports.deleteMovie = deleteMovie;
