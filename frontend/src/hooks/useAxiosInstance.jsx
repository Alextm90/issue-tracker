import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { axiosInstance } from "../api/axiosInstance";

const useAxiosInstance = () => {
  const { auth } = useAuth();

  useEffect(() => {
    const request = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }, []);
   return axiosInstance
};

export default useAxiosInstance;

