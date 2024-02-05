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
        const response = await axios.get(
          "https://issue-tracker-nwp9.onrender.com/refreshtoken",
          {
            withCredentials: true,
          }
        );
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
