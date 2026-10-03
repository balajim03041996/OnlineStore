import axios from 'axios';
// One shared axios instance for the whole app

const api = axios.create(
    {
        baseURL: import.meta.env.VITE_API_URL,// reads the value from .env.development and .env.production for cloud web service 
    });
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (!!token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default api;