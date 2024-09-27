import { Link } from "react-router-dom";
import PostDropdown from "../PostDropdown/PostDropdown.jsx";
import BtnLike from "../BtnLike/BtnLike.jsx";
import BtnComment from "../BtnComment/BtnComment.jsx";
import pfp from "../../assets/images/pfp.png";
import "./Post.css";

export default function Post({ post }) {
  return (
    <div className="post">
      <div className="post-top">
        <Link className="user" to={`/profile/${post.username}`}>
          <img className="pfp" src={pfp} alt="" />
          <div className="name">
            {post.firstName} {post.lastName}{" "}
            <span className="username">@{post.username}</span>
          </div>
        </Link>
        <PostDropdown post={post} />
      </div>
      <p className="content">{post.content}</p>
      <BtnLike post={post} />
      <BtnComment post={post} />
    </div>
  );
}
