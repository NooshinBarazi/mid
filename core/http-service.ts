import { refreshToken } from "@/redux/features/auth/authSlice";
import { store } from "@/redux/store";
import axios from "axios";

const axiosInstanceUnauth = axios.create({
  baseURL: "http://130.185.72.93:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosInstance = axios.create({
  baseURL: "http://130.185.72.93:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `"Bearer ${token}"`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      const refresh = localStorage.getItem("refresh");
      const token = localStorage.getItem("token");
      if (token && refresh) {
        try {
          
          const result = await store
            .dispatch(refreshToken({ access: token, refresh }))
            .unwrap();
          localStorage.setItem("token", result.access);

          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${result.access}`;
          originalRequest.headers["Authorization"] = `Bearer ${result.access}`;

          return axiosInstance(originalRequest);
        } catch (err) {
          console.error("Token refresh error:", err);
          localStorage.removeItem("token");
          localStorage.removeItem("refresh");
          window.location.href = "/login";
        }
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
export { axiosInstanceUnauth };
