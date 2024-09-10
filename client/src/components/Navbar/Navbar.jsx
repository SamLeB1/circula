import { Link } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext.jsx";
import useLogout from "../../hooks/useLogout.jsx";
import "./Navbar.css";

export default function Navbar() {
  const { user } = useAuthContext();
  const logout = useLogout();

  if (user)
    return (
      <nav className="navbar">
        <div className="logo">Circula</div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login" onClick={logout}>
              Log Out
            </Link>
          </li>
        </ul>
      </nav>
    );
  else
    return (
      <nav className="navbar">
        <div className="logo">Circula</div>
        <ul>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </nav>
    );
}
