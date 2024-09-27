import axios from "axios";
import useAuthContext from "../../hooks/useAuthContext.jsx";
import usePostsContext from "../../hooks/usePostsContext.jsx";
import iconLiked from "../../assets/images/icon-liked.svg";
import iconUnliked from "../../assets/images/icon-unliked.svg";
import "./BtnLike.css";

export default function BtnLike({ post }) {
  const { user } = useAuthContext();
  const { dispatch } = usePostsContext();
  const isLiked = post.likes.includes(user._id);

  function handleLike() {
    axios
      .patch(
        `${import.meta.env.VITE_SERVER}/posts/${post._id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => dispatch({ type: "REPLACE", payload: res.data }))
      .catch((err) => console.error(err));
  }

  if (isLiked)
    return (
      <button
        className="btn-liked"
        type="button"
        title="Unlike"
        onClick={handleLike}
      >
        <img src={iconLiked} alt="Unlike" />
        <span>{post.likes.length}</span>
      </button>
    );
  else
    return (
      <button
        className="btn-unliked"
        type="button"
        title="Like"
        onClick={handleLike}
      >
        <img src={iconUnliked} alt="Like" />
        <span>{post.likes.length}</span>
      </button>
    );
}
