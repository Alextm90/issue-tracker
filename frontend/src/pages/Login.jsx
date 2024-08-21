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
        "https://my-backend-latest-0ftm.onrender.com/login",
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
    <div className="form-container">
      <h2>Member Login</h2>
      <form onSubmit={handleSubmit} >
        <div>
          <label htmlFor="username">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
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
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="input-box"
            />
          </label>
        </div>
        <button type="submit" className="submit-button">Submit</button>
        <div style={{ color: "white", marginTop: ".1rem" }}>
          Need to signup? <Link to={"/signup"} style={{ color: "darkblue" }}>Signup</Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
