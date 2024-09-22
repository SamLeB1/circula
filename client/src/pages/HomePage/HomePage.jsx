import { useEffect } from "react";
import axios from "axios";
import usePostsContext from "../../hooks/usePostsContext.jsx";
import Post from "../../components/Post/Post.jsx";
import PostForm from "../../components/PostForm/PostForm.jsx";
import "./HomePage.css";

export default function HomePage() {
  const { posts, dispatch } = usePostsContext();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/posts`)
      .then((res) => dispatch({ type: "SET", payload: res.data.reverse() }))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="home-page">
      <PostForm />
      <div className="posts">
        {posts.map((post, index) => {
          return <Post key={index} post={post} />;
        })}
      </div>
    </div>
  );
}
