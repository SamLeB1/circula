import usePostModalContext from "../../hooks/usePostModalContext.jsx";
import PostModal from "../PostModal/PostModal.jsx";
import iconComment from "../../assets/images/icon-comment.svg";
import "./BtnComment.css";

export default function BtnComment({ post }) {
  const { postId, isOpen, dispatch } = usePostModalContext();
  return (
    <>
      <div
        className="btn-comment"
        onClick={() => dispatch({ type: "OPEN", payload: post._id })}
        title="Comment"
      >
        <img src={iconComment} alt="Comment" />
        <span>{post.comments.length}</span>
      </div>
      {post._id === postId && isOpen && <PostModal post={post} />}
    </>
  );
}
