import { Link } from "react-router-dom";
import BtnComment from "../BtnComment/BtnComment.jsx";
import pfp from "../../assets/images/pfp.png";
import "./Post.css";

export default function Post({ post }) {
  return (
    <div className="post">
      <Link className="user" to={`/profile/${post.username}`}>
        <img className="pfp" src={pfp} alt="" />
        <div className="name">
          {post.firstName} {post.lastName}{" "}
          <span className="username">@{post.username}</span>
        </div>
      </Link>
      <p className="content">{post.content}</p>
      <BtnComment post={post} />
    </div>
  );
}
