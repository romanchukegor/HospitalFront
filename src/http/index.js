import axios from "axios";
import { API_URL } from "src/constants";

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default api;
