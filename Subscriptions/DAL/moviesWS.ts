import axios from "axios";

const getAllMovies = async () => {
  const movies = await axios.get("https://api.tvmaze.com/shows");
  return await movies.data;
};

export default getAllMovies;

//function to add a movie to the database
