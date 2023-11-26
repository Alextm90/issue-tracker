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
        "http://localhost:3000/signup", //might need JSON.stringify before password??
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
          <label id="username">
            Username
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label id="password">
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
        <span>
          Already Registed? <Link to={"/login"}>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
