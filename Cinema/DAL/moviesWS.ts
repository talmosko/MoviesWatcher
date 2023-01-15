import axios from "axios";
import { movieObject } from "../interfaces/subscriptionsTypes";

const address =
  process.env.SUBSCRIPTIONS_API_URL || "http://localhost:8000/movies";

const getMovies = async () => {
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

const getMovieById = async (id: string) => {
  const response = await axios.get(address + "/" + id);
  const resData = await response.data;
  return resData;
};

const addMovie = async (movie: movieObject) => {
  const response = await axios.post(address, movie);
  if (response.status !== 201) {
    throw new Error("Movie not added");
  }
  const resData = await response.data;
  return resData;
};

const updateMovie = async (id: string, movie: movieObject) => {
  const response = await axios.put(address + "/" + id, movie);
  const resData = await response.data;
  return resData;
};

const deleteMovie = async (id: string) => {
  const response = await axios.delete(address + "/" + id);
  if (response.status !== 200) {
    throw new Error("Movie not deleted");
  }
  const resData = await response.data;
  return resData;
};

export { getMovies, getMovieById, addMovie, updateMovie, deleteMovie };
