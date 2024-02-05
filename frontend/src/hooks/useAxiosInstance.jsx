import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { axiosInstance } from "../api/axiosInstance";

const useAxiosInstance = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    // request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    
    // response interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      response => response,
      async (error) => {
        const originalRequest = error.config;
        // check for failed request
        if (error.response.status === 403 && !originalRequest?._retry) {
          originalRequest._retry = true;
          // Get new access token + update state
            const accessToken = await axios.get(
              "https://issue-tracker-nwp9.onrender.com/refreshtoken",
              {
                withCredentials: true,
              }
            );
            const { accesstoken } = accessToken.data;
            setAuth(accesstoken);
            // Retry the original request with the new acccess token
            originalRequest.headers["Authorization"] = `Bearer ${accesstoken}`;
            return axiosInstance(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [auth]);


  return axiosInstance;
};

export default useAxiosInstance;
