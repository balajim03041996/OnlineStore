import axios from 'axios';
// One shared axios instance for the whole app

const api = axios.create(
    {
        baseURL: import.meta.env.VITE_API_URL,// reads the value from .env.development and .env.production for cloud web service
    });

// Before every request: attach the JWT (if logged in) as "Authorization: Bearer <token>"
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (!!token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // must return, otherwise the request is not sent
});

// After every response: if the server says 401 (token expired/invalid) -> log out and go to /login
api.interceptors.response.use(
    (response) => response, // success: pass it on unchanged
    (error) => {
        if (error.response?.status == 401 && localStorage.getItem("token")) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error); // let the page's catch still handle the error
    }
);
export default api;
