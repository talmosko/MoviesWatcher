import getMovies from "../DAL/moviesWS";
import {moviesObject} from "../interfaces/mongoose.gen";

const getAllMovies = async () => {
    const movies = await getMovies();
    return movies.map((movie: any) => {
        return {
            externalId: movie.id ,
            name: movie.name ,
            genres: movie.genres ,
            image: movie.image.original ,
            premiered: movie.premiered 
        } as unknown as moviesObject
    })
}


export default getAllMovies;