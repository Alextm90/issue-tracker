import { createContext, useState, useEffect } from "react";
import { terminal } from "virtual:terminal";
import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/refreshtoken",
          null,
          {
            withCredentials: true,
          }
        );
        terminal.log(response.data, "data here");
        setAuth(response.data.accesstoken);
      } catch (error) {
        terminal.log(error.message, "errorhere");
      }
      //setLoading(false);
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
