import axios from "axios";

// https://api.themoviedb.org/3/
// movie/now_playing?api_key=e53a8d2c9a8e78d62e93212b4c18b963&append_to_response=videos,images
// https://api.themoviedb.org/3/movie/now_playing?api_key=e53a8d2c9a8e78d62e93212b4c18b963

const api  = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;