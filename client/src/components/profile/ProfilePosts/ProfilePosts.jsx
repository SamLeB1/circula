import axios from "axios";
import usePostsContext from "../../../hooks/usePostsContext.jsx";
import Post from "../../Post/Post.jsx";
import "./ProfilePosts.css";

export default function ProfilePosts({
  user,
  posts,
  sortPostsOption,
  setSortPostsOption,
}) {
  const { dispatch } = usePostsContext();

  function getPostsAndSet(url) {
    axios
      .get(url)
      .then((res) => dispatch({ type: "SET", payload: res.data }))
      .catch((err) => console.error(err));
  }

  function handleSort(e) {
    switch (e.target.value) {
      case "newest":
        getPostsAndSet(
          `${import.meta.env.VITE_SERVER}/posts?userId=${user._id}&sort=newest`
        );
        break;
      case "oldest":
        getPostsAndSet(
          `${import.meta.env.VITE_SERVER}/posts?userId=${user._id}`
        );
        break;
      default:
        console.error("Invalid sort option.");
    }
  }

  return (
    <div className="profile-posts">
      <div className="sort-posts">
        <label htmlFor="sort-posts">Sort by:</label>
        <select
          id="sort-posts"
          value={sortPostsOption}
          onChange={(e) => {
            setSortPostsOption(e.target.value);
            handleSort(e);
          }}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      <div className="posts">
        {posts.map((post, index) => {
          return <Post key={index} post={post} />;
        })}
      </div>
    </div>
  );
}
