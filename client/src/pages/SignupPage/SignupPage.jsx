import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignupPage.css";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_SERVER}/signup`, {
        firstName,
        lastName,
        email,
        username,
        password,
      })
      .then(() => navigate("/"))
      .catch((err) => {
        console.error(err);
        setErrMessage(err.response.data.msg);
      });
  }

  return (
    <div className="form-signup">
      <h1>Create your account</h1>
      {errMessage && <div className="error">Error: {errMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input
          className="input-box"
          id="first-name"
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          required
          type="text"
          value={firstName}
        />
        <input
          className="input-box"
          id="last-name"
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last name"
          required
          type="text"
          value={lastName}
        />
        <input
          className="input-box"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          type="email"
          value={email}
        />
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
        <input className="input-submit" type="submit" value="Sign Up" />
      </form>
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}
