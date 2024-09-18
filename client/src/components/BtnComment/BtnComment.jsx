import { useState } from "react";
import PostModal from "../PostModal/PostModal.jsx";
import iconComment from "../../assets/images/icon-comment.svg";
import "./BtnComment.css";

export default function BtnComment({ post }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className="btn-comment"
        onClick={() => setIsOpen(true)}
        title="Comment"
      >
        <img src={iconComment} alt="Comment" />
        <span>{post.comments.length}</span>
      </div>
      <PostModal post={post} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
