import axios from 'axios'

//BASE DA URL: https://api.themoviedb.org/3/
//URL DA API: https://api.themoviedb.org/3/movie/now_playing?api_key=640ba6ddec8bba985e6f040ed2521af6

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;