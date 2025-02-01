import axios from "axios";
// get the base url from env file
export const baseUrl = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    // timeout: 5000,
})
// Response interceptor
baseUrl.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error)
    }
);
