import pfp from "../../../assets/images/pfp.png";
import "./ProfileHeader.css";

export default function ProfileHeader({ user, setTab }) {
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
          <button onClick={() => setTab("overview")}>Overview</button>
        </li>
        <li>
          <button onClick={() => setTab("posts")}>Posts</button>
        </li>
        <li>
          <button onClick={() => setTab("about")}>About</button>
        </li>
        <li>
          <button onClick={() => setTab("friends")}>Friends</button>
        </li>
      </ul>
    </div>
  );
}
