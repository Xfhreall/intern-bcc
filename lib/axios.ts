import axios from "axios";

import {
  getAccessToken,
  getRefreshToken,
  useAuthStore,
} from "@/store/authStore";

export const internalApi = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

authApi.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await axios.post("/api/auth/refresh-token", {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        useAuthStore.getState().setTokens({
          accessToken,
          refreshToken: newRefreshToken,
        });

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return authApi(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().clearTokens();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
