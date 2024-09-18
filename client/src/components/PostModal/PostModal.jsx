import { createPortal } from "react-dom";
import iconClose from "../../assets/images/icon-close.svg";
import "./PostModal.css";

export default function PostModal({ post, isOpen, setIsOpen }) {
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
        </div>
      </>,
      document.getElementById("overlays")
    );
}
