import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import useAuthContext from "../../hooks/useAuthContext.jsx";
import usePostsContext from "../../hooks/usePostsContext.jsx";
import usePostModalContext from "../../hooks/usePostModalContext.jsx";
import "./EditPostModal.css";

export default function EditPostModal({ post, setIsOpen }) {
  const [content, setContent] = useState(post.content);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();
  const { dispatch } = usePostsContext();
  const { isOpen: isOpenPostModal } = usePostModalContext();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    axios
      .patch(
        `${import.meta.env.VITE_SERVER}/posts/${post._id}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        dispatch({ type: "REPLACE", payload: res.data });
        setIsOpen(false);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
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
        onClick={() => {
          if (!isLoading) setIsOpen(false);
        }}
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
          <input
            disabled={isLoading || content === ""}
            type="submit"
            value="Save"
          />
        </form>
      </div>
    </>,
    document.getElementById("overlays")
  );
}
