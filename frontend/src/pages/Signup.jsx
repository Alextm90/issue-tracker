import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { terminal } from "virtual:terminal";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username == "" || password == "") {
       return toast("Required fields missing!");
    }

    try {
      const response = await axios.post("http://localhost:3000/signup", {
        username,
        password,
      });

      const { success, message } = response.data;
      terminal.log(response)

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
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      terminal.log(error);
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
