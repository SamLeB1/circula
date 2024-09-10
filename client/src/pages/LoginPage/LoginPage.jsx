import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin.jsx";
import "./LoginPage.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, errMessage } = useLogin();

  async function handleSubmit(e) {
    e.preventDefault();
    await login(username, password);
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
        <input
          className="input-submit"
          disabled={isLoading}
          type="submit"
          value="Log In"
        />
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}
