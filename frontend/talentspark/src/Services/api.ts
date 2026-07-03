import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const api = axios.create({
    baseURL: "",
});

// Automatically attach the Bearer token to every request
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
        const headers = config.headers ?? {};
        config.headers = {
            ...(headers as Record<string, string>),
            Authorization: `Bearer ${token}`,
        } as any;
    }
    return config;
});

export default api;
