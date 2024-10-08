import { useState, useRef } from "react";
import EditPostModal from "../EditPostModal/EditPostModal.jsx";
import useAuthContext from "../../hooks/useAuthContext.jsx";
import useDeletePost from "../../hooks/useDeletePost.jsx";
import useClickOutside from "../../hooks/useClickOutside.jsx";
import iconMore from "../../assets/images/icon-more.svg";
import iconEdit from "../../assets/images/icon-edit.svg";
import iconDelete from "../../assets/images/icon-delete.svg";
import "./PostDropdown.css";

export default function PostDropdown({ post }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useAuthContext();
  const isOwner = user.username === post.username ? true : false;
  const deletePost = useDeletePost();
  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <>
      <div ref={dropdownRef} className="post-dropdown">
        <button
          className="btn-more"
          type="button"
          title="More"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img className="icon-more" src={iconMore} alt="More" />
        </button>
        {isOpen && isOwner && (
          <div className="dropdown-list">
            <button
              className="dropdown-btn"
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsOpenEdit(true);
              }}
            >
              <img className="dropdown-icon" src={iconEdit} alt="" />
              <span>Edit</span>
            </button>
            <button
              className="dropdown-btn"
              type="button"
              onClick={() => {
                setIsOpen(false);
                deletePost(post._id);
              }}
            >
              <img className="dropdown-icon" src={iconDelete} alt="" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
      {isOpenEdit && <EditPostModal post={post} setIsOpen={setIsOpenEdit} />}
    </>
  );
}
