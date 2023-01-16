import axios from "axios";
import { movieObject } from "../interfaces/subscriptionsTypes";

const address =
  process.env.SUBSCRIPTIONS_API_URL || "http://localhost:8000/movies";

const getMovies = async (): Promise<[movieObject]> => {
  try {
    const response = await axios.get(address);
    if (response.status !== 200) {
      throw new Error("Movies not found");
    }
    const movies = await response.data;

    //convert the premiered:string to date
    return movies.map((movie: any) => {
      return { ...movie, premiered: new Date(movie.premiered) };
    });
  } catch (err: any) {
    throw new Error(err);
  }
};

const getMovieById = async (movieId: string): Promise<movieObject> => {
  try {
    const response = await axios.get(address + "/" + movieId);
    if (response.status !== 200) {
      throw new Error("Movies not found");
    }
    const resData: movieObject = (await response.data) as movieObject;

    //convert premiered to a date
    const premiered = resData.premiered
      ? new Date(resData.premiered)
      : undefined;
    return { ...resData, premiered: premiered };
  } catch (err: any) {
    throw new Error(err);
  }
};

const addMovie = async (movie: movieObject) => {
  try {
    const response = await axios.post(address, movie);
    if (response.status !== 201) {
      throw new Error("Movie not added");
    }
    const resData = await response.data;
    return resData;
  } catch (error: any) {
    throw new Error(error);
  }
};

const updateMovie = async (movieId: string, movie: movieObject) => {
  try {
    const response = await axios.put(address + "/" + movieId, movie);
    console.log(response.status);
    if (response.status !== 201) {
      throw new Error("Movie not updated");
    }
    const resData = await response.data;
    return resData;
  } catch (error: any) {
    throw new Error(error);
  }
};

const deleteMovie = async (movieId: string) => {
  const response = await axios.delete(address + "/" + movieId);
  if (response.status !== 200) {
    throw new Error("Movie not deleted");
  }
  const resData = await response.data;
  return resData;
};

export { getMovies, getMovieById, addMovie, updateMovie, deleteMovie };
