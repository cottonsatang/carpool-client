import axios from 'axios';
import {API_URL} from "@env";
import { getEncryptStorage } from "../utils";

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await getEncryptStorage("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
