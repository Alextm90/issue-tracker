import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://issue-tracker-nwp9.onrender.com",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
