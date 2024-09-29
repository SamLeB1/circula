import Post from "../../Post/Post.jsx";
import "./ProfilePosts.css";

export default function ProfilePosts({ posts }) {
  return (
    <div className="profile-posts">
      <div className="posts">
        {posts.map((post, index) => {
          return <Post key={index} post={post} />;
        })}
      </div>
    </div>
  );
}
