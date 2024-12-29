import axios from 'axios';
import { baseUrl} from './api'

const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
}); 
axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    (response) => {
        console.log("Response:", response);
        
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
