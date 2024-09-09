import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_SERVER}/login`, { username, password })
      .then(() => navigate("/"))
      .catch((err) => {
        console.error(err);
        setErrMessage(err.response.data.msg);
      });
  }

  return (
    <div className="form-login">
      <h1>Log in to Circula</h1>
      {errMessage && <div className="error">Error: {errMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input
          className="input-box"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          type="text"
          value={username}
        />
        <input
          className="input-box"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          type="password"
          value={password}
        />
        <input className="input-submit" type="submit" value="Log In" />
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}
