import axios from "axios"

axios.defaults.baseURL = "https://api.realworld.io/api"

axios.interceptors.request.use(config => {
    const token = JSON.parse(window.localStorage.getItem('token'));
    const authorization = token? `Token ${token}`: '';
    config.headers.Authorization = authorization
    return  config;

})

export default axios