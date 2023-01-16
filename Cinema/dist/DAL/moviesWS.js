"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.addMovie = exports.getMovieById = exports.getMovies = void 0;
const axios_1 = __importDefault(require("axios"));
const address = process.env.SUBSCRIPTIONS_API_URL || "http://localhost:8000/movies";
const getMovies = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(address);
        if (response.status !== 200) {
            throw new Error("Movies not found");
        }
        const movies = yield response.data;
        //convert the premiered:string to date
        return movies.map((movie) => {
            return Object.assign(Object.assign({}, movie), { premiered: new Date(movie.premiered) });
        });
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.getMovies = getMovies;
const getMovieById = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(address + "/" + movieId);
        if (response.status !== 200) {
            throw new Error("Movies not found");
        }
        const resData = (yield response.data);
        //convert premiered to a date
        const premiered = resData.premiered
            ? new Date(resData.premiered)
            : undefined;
        return Object.assign(Object.assign({}, resData), { premiered: premiered });
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.getMovieById = getMovieById;
const addMovie = (movie) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(address, movie);
        if (response.status !== 201) {
            throw new Error("Movie not added");
        }
        const resData = yield response.data;
        return resData;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.addMovie = addMovie;
const updateMovie = (movieId, movie) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.put(address + "/" + movieId, movie);
        console.log(response.status);
        if (response.status !== 201) {
            throw new Error("Movie not updated");
        }
        const resData = yield response.data;
        return resData;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.updateMovie = updateMovie;
const deleteMovie = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.delete(address + "/" + movieId);
    if (response.status !== 200) {
        throw new Error("Movie not deleted");
    }
    const resData = yield response.data;
    return resData;
});
exports.deleteMovie = deleteMovie;
