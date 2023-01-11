import axios from "axios";

const getAllMovies = async () => { 
    const movies = await axios.get('https://api.tvmaze.com/shows');
    return movies.data;
}

export default getAllMovies ;
