import { Link } from "react-router-dom";
import pfp from "../../assets/images/pfp.png";
import "./ProfileHeader.css";

export default function ProfileHeader({ user }) {
  return (
    <div className="profile-header">
      <div className="user">
        <img className="pfp" src={pfp} alt="" />
        <div>
          <div className="name">
            {user.firstName} {user.lastName}
          </div>
          <div className="username">@{user.username}</div>
        </div>
      </div>
      <hr />
      <ul className="profile-nav">
        <li>
          <Link to="#">Posts</Link>
        </li>
        <li>
          <Link to="#">About</Link>
        </li>
        <li>
          <Link to="#">Friends</Link>
        </li>
      </ul>
    </div>
  );
}
