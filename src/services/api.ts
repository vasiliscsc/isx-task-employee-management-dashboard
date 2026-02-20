import type { AxiosInstance } from "axios";
import axios from "axios";

const api: AxiosInstance = axios.create({
  // include fallback base url to the default in case of missing .env file
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
