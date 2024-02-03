import axios from "axios";
import RefreshToken from "./RefreshToken.jsx";
import secureLocalStorage from "react-secure-storage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${secureLocalStorage.getItem("acessToken")}`,
  },
});
api.defaults.headers.common["Accept"] = "application/json";
api.defaults.headers.common["Accept"] = "multipart/form-data";
api.interceptors.response.use(
  (response) => response, // Kembalikan response jika tidak ada error
  async (error) => {
    const originalRequest = error.config;

    // Check apakah response error adalah 401 (Unauthorized) dan originalRequest belum di retry
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh token
        await RefreshToken();

        // Update access token di originalRequest
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${secureLocalStorage.getItem("acessToken")}`;

        // Retry request yang sebelumnya error
        return api(originalRequest);
      } catch (error) {
        // Tangani error refresh token
        console.error("Error refreshing token:", error);
        throw error;
      }
    }

    // Kembalikan error jika bukan 401 atau originalRequest sudah di retry
    throw error;
  }
);
export const axiosInstance = api;
