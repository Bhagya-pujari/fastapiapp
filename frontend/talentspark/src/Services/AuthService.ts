import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../types/user";
import api from "./api";

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("username", credentials.email);
    formData.append("password", credentials.password);

    const response = await api.post<LoginResponse>(`/auth/login`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return response.data;
};

export const register = async (user: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>(`/auth/register`, user);
    return response.data;
};
