import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuthContext from "../../hooks/useAuthContext.jsx";
import PostDropdown from "../PostDropdown/PostDropdown.jsx";
import pfp from "../../assets/images/pfp.png";
import iconClose from "../../assets/images/icon-close.svg";
import "./PostModal.css";

export default function PostModal({ post, setIsOpen }) {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    document.body.classList.add("disable-scroll");
    axios
      .get(`${import.meta.env.VITE_SERVER}/comments?postId=${post._id}`)
      .then((res) => setComments(res.data.reverse()))
      .catch((err) => console.error(err));
    return () => document.body.classList.remove("disable-scroll");
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_SERVER}/comments`,
        { postId: post._id, content },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setContent("");
        setComments((comments) => [res.data, ...comments]);
      })
      .catch((err) => console.error(err));
  }

  return createPortal(
    <>
      <div className="overlay" onClick={() => setIsOpen(false)} />
      <div className="post-modal">
        <div className="top-bar">
          <div style={{ height: "36px", width: "36px" }} />
          <h1>{post.firstName}'s Post</h1>
          <button onClick={() => setIsOpen(false)} type="button" title="Close">
            <img src={iconClose} alt="Close" />
          </button>
        </div>
        <div className="post-open">
          <div className="post-view">
            <div className="post-top">
              <Link className="user" to={`/profile/${post.username}`}>
                <img className="pfp" src={pfp} alt="" />
                <div className="name">
                  {post.firstName} {post.lastName}{" "}
                  <span className="username">@{post.username}</span>
                </div>
              </Link>
              <PostDropdown />
            </div>
            <p className="content">{post.content}</p>
          </div>
          <hr />
          <div className="comments">
            {comments.length === 1 ? (
              <h2>1 Comment</h2>
            ) : (
              <h2>{comments.length} Comments</h2>
            )}
            {comments.map((comment, index) => {
              return (
                <div key={index} className="comment">
                  <Link
                    className="pfp-link"
                    to={`/profile/${comment.username}`}
                  >
                    <img className="pfp" src={pfp} alt="" />
                  </Link>
                  <div className="comment-bubble">
                    <Link className="name" to={`/profile/${comment.username}`}>
                      {comment.firstName} {comment.lastName}{" "}
                      <span className="username">@{comment.username}</span>
                    </Link>
                    <p className="content">{comment.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            id="content"
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            rows="4"
            value={content}
          />
          <input disabled={content === ""} type="submit" value="Post" />
        </form>
      </div>
    </>,
    document.getElementById("overlays")
  );
}
