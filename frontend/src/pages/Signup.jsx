import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { terminal } from "virtual:terminal";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const Signup = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username == "" || password == "") {
      return toast("Required fields missing!");
    }

    try {
      const response = await axios.post(
        "https://my-backend-latest-0ftm.onrender.com/signup",
        {
          username,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const { success, message, accesstoken } = response.data;
      setAuth(accesstoken);

      if (success) {
        toast(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast(message, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      terminal.log(error.message);
    }
  };

  return (
    <div className="form_container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
               className="input-box"
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
               className="input-box"
            />
          </label>
        </div>
        <button type="submit" className="submit-button">Submit</button>
        <div>
          Already Registed? <Link to={"/login"} style={{ color: "darkblue" }}>Login</Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
