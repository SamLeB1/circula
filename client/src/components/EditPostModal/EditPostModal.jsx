import { createPortal } from "react-dom";
import "./EditPostModal.css";

export default function EditPostModal({ post, setIsOpen }) {
  return createPortal(
    <>
      <div
        className="overlay"
        style={{ zIndex: 11 }}
        onClick={() => setIsOpen(false)}
      />
      <div className="edit-post-modal">{post.content}</div>
    </>,
    document.getElementById("overlays")
  );
}
