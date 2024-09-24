import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import usePostModalContext from "../../hooks/usePostModalContext.jsx";
import "./EditPostModal.css";

export default function EditPostModal({ post, setIsOpen }) {
  const [content, setContent] = useState(post.content);
  const { isOpen: isOpenPostModal } = usePostModalContext();

  function handleSubmit() {
    e.preventDefault();
  }

  useEffect(() => {
    if (!isOpenPostModal) document.body.classList.add("disable-scroll");
    const input = document.getElementById("edit-content");
    const length = input.value.length;
    input.focus();
    input.setSelectionRange(length, length);
    return () => {
      if (!isOpenPostModal) document.body.classList.remove("disable-scroll");
    };
  }, []);

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
            id="edit-content"
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
