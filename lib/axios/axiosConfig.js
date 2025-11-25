import axios from "axios";
export const axiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL||"http://192.168.29.225:1065",
});

// Request Interceptor — add token
axiosConfig.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor — token expired
axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message?.toLowerCase() || "";

    if (
      message.includes("token invalid") ||
      message.includes("token expired") ||
      message.includes("unauthorized")
    ) {
      if (typeof window !== "undefined") {
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosConfig;
