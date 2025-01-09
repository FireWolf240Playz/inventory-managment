import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  timeout: 5000,
  headers: {
    Accept: "*/*",
  },
});

api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default api;
