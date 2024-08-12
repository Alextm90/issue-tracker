import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://my-backend-latest-0ftm.onrender.com",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
