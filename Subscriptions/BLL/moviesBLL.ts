import * as moviesWS from "../DAL/moviesWS";
import {
  MovieDocument,
  MovieObject,
  SubscriptionObject,
} from "../interfaces/mongoose.gen";
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

const deleteMovie = async (
  movieId: string
): Promise<{
  movieId: MovieObject["_id"];
  subscriptions: SubscriptionObject[];
}> => {
  try {
    //delete movie
    const deletedMovie: MovieObject | null = await Movie.findByIdAndDelete(
      movieId,
      {
        _id: 1,
      }
    ).catch((err) => {
      throw new Error("Error deleting movie: " + err);
    });

    if (!deletedMovie) throw new Error("Movie not found");

    // Get the Subscriptions _id's that have the specified movieId
    const subsToUpdate = await Subscription.find(
      {
        "movies.movieId": movieId,
      },
      { _id: 1 }
    ).catch((err) => {
      throw new Error(
        "Error getting Subscriptions: for movieId" + movieId + err
      );
    });

    // Update all Subscriptions that have the specified movieId
    await Subscription.updateMany(
      { "movies.movieId": movieId },
      { $pull: { movies: { movieId: movieId } } }
    ).catch((err) => {
      throw new Error("Error updating Subscriptions: " + err);
    });

    // Get the updated Subscriptions by their _id's
    const updatedSubs = await Subscription.find({
      _id: { $in: subsToUpdate },
    }).catch((err) => {
      throw new Error("Error getting updated Subscriptions: " + err);
    });

    return { movieId: deletedMovie?._id, subscriptions: updatedSubs };
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
