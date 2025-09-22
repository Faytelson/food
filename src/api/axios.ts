import axios from "axios";
import type { AxiosInstance } from "axios";
import qs from "qs";

const BASE_URL = import.meta.env.VITE_API_BASE ?? "https://front-school-strapi.ktsdev.ru/api";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "indices" }),
});

export default api;
