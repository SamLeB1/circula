import { useState } from "react";
import axios from "axios";
import useAuthContext from "../../hooks/useAuthContext.jsx";
import "./PostForm.css";

export default function PostForm({ setPosts }) {
  const [content, setContent] = useState("");
  const { user } = useAuthContext();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_SERVER}/posts`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setContent("");
        setPosts((posts) => [res.data, ...posts]);
      })
      .catch((err) => console.error(err));
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <textarea
        id="content"
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        rows="4"
        value={content}
      />
      <input disabled={content === ""} type="submit" value="Post" />
    </form>
  );
}
