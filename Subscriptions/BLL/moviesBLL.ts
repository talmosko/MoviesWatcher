import * as moviesWS from "../DAL/moviesWS";
import { MovieDocument, MovieObject } from "../interfaces/mongoose.gen";
import Movie from "../models/movieModel";
import Subscription from "../models/subscriptionsModel";

const getAllMoviesFromAPI = async (): Promise<MovieObject[]> => {
  try {
    const movies = await moviesWS.getAllMovies();
    return movies.map((movie: any) => {
      return {
        externalId: movie.id,
        name: movie.name,
        genres: movie.genres,
        image: movie.image.original,
        premiered: movie.premiered,
      } as unknown as MovieObject;
    });
  } catch (err: any) {
    throw new Error(err);
  }
};

const initMoviesDB = async (): Promise<void> => {
  await Movie.deleteMany({});
  const movies = await getAllMoviesFromAPI();
  movies.forEach(async (movie: MovieObject) => {
    const mov = new Movie(movie);
    await mov.save();
  });
};

const getAllMovies = async (): Promise<MovieObject[]> => {
  try {
    const movies = await Movie.find({});

    return movies;
  } catch (err: any) {
    throw new Error(err);
  }
};

const getMovieById = async (movieId: string): Promise<MovieObject | null> => {
  try {
    return await Movie.findById(movieId);
  } catch (err: any) {
    throw new Error(err);
  }
};

const addMovie = async (movie: MovieObject): Promise<void> => {
  try {
    const mov = new Movie(movie);
    await mov.save();
  } catch (err: any) {
    throw new Error(err);
  }
};

const updateMovie = async (
  movieId: string,
  movie: MovieObject
): Promise<MovieObject | null> => {
  try {
    return await Movie.findByIdAndUpdate(movieId, movie);
  } catch (err: any) {
    throw new Error(err);
  }
};

const deleteMovie = async (movieId: string): Promise<MovieObject | null> => {
  try {
    //Delete subscriptions of movie
    const subsc = await Subscription.updateMany(
      { "movies.movieId": movieId },
      { $pull: { movies: { movieId: movieId } } }
    );

    //delete movie
    return await Movie.findByIdAndDelete(movieId);
  } catch (err: any) {
    throw new Error(err);
  }
};

export {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
  initMoviesDB,
};
