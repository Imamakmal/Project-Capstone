import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://fakestoreapi.com/auth/login", {
        username,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        setError("Invalid username or password. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while logging in. Please try again later.");
    }
  };

  return (
    <div className="hero min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 shadow-2xl w-[500px]">
        <h1 className="text-2xl font-bold text-center mt-4">Login</h1>
        <form className="card-body" onSubmit={handleLogin}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              className="input input-bordered"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="input input-bordered"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="form-control mt-6">
            <button type="submit" className="btn bg-blue-500">
              Login
            </button>
            <br />
            <p>Username : johnd</p>
            <p>Password : m38rmF$</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;