import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 10000,
});

API.interceptors.request.use(async (config) => {
  try {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du token :", error);
  }

  return config;
});

export default API;
