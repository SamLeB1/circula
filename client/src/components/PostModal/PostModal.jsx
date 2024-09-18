import { createPortal } from "react-dom";
import "./PostModal.css";

export default function PostModal({ post, isOpen, setIsOpen }) {
  if (!isOpen) return null;
  else
    return createPortal(
      <>
        <div className="overlay" onClick={() => setIsOpen(false)} />
        <div className="post-modal">{post.content}</div>
      </>,
      document.getElementById("overlays")
    );
}
