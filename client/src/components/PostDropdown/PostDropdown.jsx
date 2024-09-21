import { useState, useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside.jsx";
import iconMore from "../../assets/images/icon-more.svg";
import iconDelete from "../../assets/images/icon-delete.svg";
import "./PostDropdown.css";

export default function PostDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div ref={dropdownRef} className="post-dropdown">
      <button
        className="btn-more"
        type="button"
        title="More"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img className="icon-more" src={iconMore} alt="More" />
      </button>
      {isOpen && (
        <div className="dropdown-list">
          <button className="dropdown-btn" type="button">
            <img className="dropdown-icon" src={iconDelete} alt="" />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
}
