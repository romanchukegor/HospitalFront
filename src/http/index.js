import axios from "axios";
import { API_URL } from "src/constants";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      try {
        const response = await axios.get(`${API_URL}/refresh`, {
          withCredentials: true,
        });

        localStorage.setItem("token", response.date.accessToken);

        return $api.request(originalRequest);
      } catch (error) {
        throw error;
      }
    }
  }
);

export default $api;
