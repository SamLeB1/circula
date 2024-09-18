import { useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import useAuthContext from "../../hooks/useAuthContext.jsx";
import iconClose from "../../assets/images/icon-close.svg";
import "./PostModal.css";

export default function PostModal({ post, isOpen, setIsOpen }) {
  const [content, setContent] = useState("");
  const { user } = useAuthContext();

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
      .then((res) => setContent(""))
      .catch((err) => console.error(err));
  }

  if (!isOpen) return null;
  else
    return createPortal(
      <>
        <div className="overlay" onClick={() => setIsOpen(false)} />
        <div className="post-modal">
          <div className="top-bar">
            <div style={{ height: "36px", width: "36px" }} />
            <h1>{post.firstName}'s Post</h1>
            <button onClick={() => setIsOpen(false)} type="button">
              <img src={iconClose} alt="Close" title="Close" />
            </button>
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
