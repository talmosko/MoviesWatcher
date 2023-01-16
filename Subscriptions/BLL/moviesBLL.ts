import * as moviesWS from "../DAL/moviesWS";
import {
  moviesDocument,
  moviesObject,
  moviesQueries,
} from "../interfaces/mongoose.gen";
import Movie from "../models/movieModel";

const getAllMoviesFromAPI = async () => {
  const movies = await moviesWS.getAllMovies();
  return movies.map((movie: any) => {
    return {
      externalId: movie.id,
      name: movie.name,
      genres: movie.genres,
      image: movie.image.original,
      premiered: movie.premiered,
    } as unknown as moviesObject;
  });
};

const initMoviesDB = async () => {
  await Movie.deleteMany({});
  const movies = await getAllMoviesFromAPI();
  movies.forEach(async (movie: moviesObject) => {
    const mov = new Movie(movie);
    await mov.save();
  });
};

const getAllMovies = async () => {
  return await Movie.find({});
};

const getMovieById = async (movieId: string) => {
  return await Movie.findById(movieId);
};

const addMovie = async (movie: moviesObject) => {
  const mov = new Movie(movie);
  await mov.save();
};

const updateMovie = async (movieId: string, movie: moviesObject) => {
  return await Movie.findByIdAndUpdate(movieId, movie);
};

const deleteMovie = async (movieId: string) => {
  return await Movie.findByIdAndDelete(movieId);
};

export {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
  initMoviesDB,
};
