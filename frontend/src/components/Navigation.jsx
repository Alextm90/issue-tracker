import React from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { terminal } from "virtual:terminal";

const Navigation = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const logOut = async () => {
    setAuth(null);
    try {
      const response = await axios.post("http://localhost:3000/logout", null, {
        withCredentials: true,
      });
      terminal.log(response, "response")
      setTimeout(() => {
        navigate("/login");
      }, 100);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};

export default Navigation;

//<button onClick={logOut}>Log Out</button>;
