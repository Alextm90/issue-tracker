import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { terminal } from "virtual:terminal";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://issue-tracker-nwp9.onrender.com/login",
        {
          username,
          password,
        },
        { withCredentials: true }
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
      <h2>Login Account</h2>
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
          Need to signup? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
