import getMovies from "../DAL/moviesWS";
import { moviesObject } from "../interfaces/mongoose.gen";
import Movie from "../models/movieModel";

const getAllMoviesFromAPI = async () => {
  const movies = await getMovies();
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

const getMovieById = async (id: string) => {
  return await Movie.findById(id);
};

const addMovie = async (movie: moviesObject) => {
  const mov = new Movie(movie);
  await mov.save();
};

const updateMovie = async (id: string, movie: moviesObject) => {
  return await Movie.findByIdAndUpdate(id, movie);
};

const deleteMovie = async (id: string) => {
  return await Movie.findByIdAndDelete(id);
};

export {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
  initMoviesDB,
};
