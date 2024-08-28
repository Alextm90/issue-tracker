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
      const response = await axios.post(
        "https://my-backend-latest-0ftm.onrender.com/logout",
        null,
        {
          withCredentials: true,
        }
      );
      terminal.log(response, "response")
      setTimeout(() => {
        navigate("/login");
      }, 100);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{marginLeft: "55rem" }} >
      <button onClick={logOut} className="logout-button">Log Out</button>
    </div>
  )
};

export default Navigation;


