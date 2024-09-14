import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../../components/Post/Post.jsx";
import PostForm from "../../components/PostForm/PostForm.jsx";
import "./HomePage.css";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/posts`)
      .then((res) => setPosts(res.data.reverse()))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="home-page">
      <PostForm setPosts={setPosts} />
      <div className="posts">
        {posts.map((post, index) => {
          return <Post key={index} post={post} />;
        })}
      </div>
    </div>
  );
}
