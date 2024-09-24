import { useState } from "react";
import { createPortal } from "react-dom";
import "./EditPostModal.css";

export default function EditPostModal({ post, setIsOpen }) {
  const [content, setContent] = useState(post.content);

  function handleSubmit() {
    e.preventDefault();
  }

  return createPortal(
    <>
      <div
        className="overlay"
        style={{ zIndex: 11 }}
        onClick={() => setIsOpen(false)}
      />
      <div className="edit-post-modal">
        <h1>Edit Post</h1>
        <form className="edit-post-form" onSubmit={handleSubmit}>
          <textarea
            id="content"
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            value={content}
          />
          <input disabled={content === ""} type="submit" value="Save" />
        </form>
      </div>
    </>,
    document.getElementById("overlays")
  );
}
