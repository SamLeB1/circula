import iconComment from "../../assets/images/icon-comment.svg";
import "./BtnComment.css";

export default function BtnComment({ post }) {
  return (
    <div className="btn-comment" title="Comment">
      <img src={iconComment} alt="Comment" />
      <span>{post.comments.length}</span>
    </div>
  );
}
