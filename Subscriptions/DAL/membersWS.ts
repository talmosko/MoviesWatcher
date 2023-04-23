import axios from "axios";

const getAllMembers = async () => { 
    const movies = await axios.get('https://jsonplaceholder.typicode.com/users');
    return movies.data;
}

export default getAllMembers ;